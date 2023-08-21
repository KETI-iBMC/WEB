#pragma once
#include <common/keti_std.hpp>
#include <sqlite3.h>
#include <unordered_map>
#define LOG_DB "/conf/IBMC_log.db"
static int FanPolicyCallback(void *data, int argc, char **argv,
                             char **colNames);
enum class POLICY_TYPE { TYPE_FAN, TYPE_CPU, ALL };
std::unordered_map<std::string, POLICY_TYPE> colorMap = {
    {"FAN", POLICY_TYPE::TYPE_FAN},
    {"CPU", POLICY_TYPE::TYPE_CPU},
    {"ALL", POLICY_TYPE::ALL}};

std::string PolicyoString(POLICY_TYPE policy) {
  for (const auto &pair : colorMap) {
    if (pair.second == policy) {
      return pair.first;
    }
  }
  return "unknown";
}

class Fan {
private:
  int fanID;
  string fan_name;
  int PWM;
  int max_PWM;
  int max_RPM;
  int RPM;
  string model;
  string manufacture;
  string FanController;
  int policyID;

  struct Position {
    int slotNumber; // raw
    int columnNumber;
    std::string chassisName;
  } pos;
  Fan(){};

public:
  Fan(int _fanID, const std::string &_fan_name, int _PWM, int _max_PWM,
      int _max_RPM, int _RPM, const std::string &_model,
      const std::string &_manufacture, const std::string &_FanController,
      int _slotNumber, int _columnNumber, const std::string &_chassisName,
      int policyID)
      : fanID(_fanID), fan_name(_fan_name), PWM(_PWM), max_PWM(_max_PWM),
        max_RPM(_max_RPM), RPM(_RPM), model(_model), manufacture(_manufacture),
        FanController(_FanController) {
    this->policyID = policyID;
    // pos의 멤버 변수 초기화
    pos.slotNumber = _slotNumber;
    pos.columnNumber = _columnNumber;
    pos.chassisName = _chassisName;
  }
  bool Insert_Fan(sqlite3 *db, int EnergyManagerID) {
    char query[500];
    sprintf(
        query,
        "INSERT INTO Fan (FanName, PWM, RPM, chassisName, slotNumber, "
        "columnNumber, "
        "Manufacturer, Model, MaxPWM, MaxRPM, FanController, FanPolicyID) "
        "VALUES ('%s', %d, %d, '%s', %d, %d, '%s', '%s', %d, %d, '%s', %d);",
        fan_name.c_str(), PWM, RPM, pos.chassisName.c_str(), pos.slotNumber,
        pos.columnNumber, manufacture.c_str(), model.c_str(), max_PWM, max_RPM,
        FanController.c_str(), policyID);
    char *errMsg = nullptr;
    int rc = sqlite3_exec(db, query, nullptr, nullptr, &errMsg);
    if (rc != SQLITE_OK) {
      std::cerr << "SQL error: " << errMsg << std::endl;
      sqlite3_free(errMsg);
      return false;
    } else {
      std::cout << "Fan record inserted successfully" << std::endl;
    }
    return true;
  }
  bool Update_Fan(sqlite3 *db, int fanID, const std::string &fan_name, int PWM,
                  int RPM, int slotNumber, int columnNumber,
                  const std::string &chassisName,
                  const std::string &manufacture, const std::string &model,
                  int max_PWM, int max_RPM, const std::string &FanController,
                  int fan_policyID) {
    char query[500];
    sprintf(
        query,
        "UPDATE Fan "
        "SET FanName = '%s', PWM = %d, RPM = %d, slotNumber = %d, columnNumber "
        "= %d, "
        "chassisName = '%s', Manufacturer = '%s', Model = '%s', MaxPWM = %d, "
        "MaxRPM = %d, FanController = '%s', FanPolicyID = %d "
        "WHERE FanID = %d;",
        fan_name.c_str(), PWM, RPM, slotNumber, columnNumber,
        chassisName.c_str(), manufacture.c_str(), model.c_str(), max_PWM,
        max_RPM, FanController.c_str(), fan_policyID, fanID);
    char *errMsg = nullptr;
    int rc = sqlite3_exec(db, query, nullptr, nullptr, &errMsg);
    if (rc != SQLITE_OK) {
      std::cerr << "SQL error: " << errMsg << std::endl;
      sqlite3_free(errMsg);
      return false;
    } else {
      std::cout << "Fan record updated successfully" << std::endl;
    }
    return true;
  }
  ~Fan(){};
};
class Policy {
private:
public:
  // TemperatureSource Setter
  sqlite3 *db;
  POLICY_TYPE policy_type;
  string description;
  string policyName;
  string last_date_time;
  string algorithm;
  bool status;
  int poicy_id;
  Policy() {}
  virtual bool Enable_Policy(bool status) = 0;
  // virtual bool Delete_Policy() = 0;
  // virtual void *Policy_Monitor(string query) = 0;
  void Policy_Info() {
    log(info) << "policyName :" << policyName << "status" << status
              << "last modify time :" << last_date_time << endl;
  }
  virtual bool Insert_Policy(sqlite3 *db, int energyManagerID) = 0;
  ~Policy(){};
};
class Fan_Policy : public Policy {
private:
public:
  unordered_map<int, Fan *> Target_Fans;
  string temperatureSource;
  int desiredTemperature;
  int energyManagerID;
  Fan_Policy(sqlite3 *db, int policyID) {
    char query[500];
    sprintf(query,
            "SELECT FanPolicyID, PolicyName, Description, Algorithm, "
            "DesiredTemperature, TemperatureSource, DATETIME, EnergyManagerID "
            "FROM Fan_Policy WHERE FanPolicyID = %d;",
            policyID);
    char *errMsg = nullptr;
    int rc = sqlite3_exec(db, query, FanPolicyCallback, this, &errMsg);
    if (rc != SQLITE_OK) {
      std::cerr << "SQL error: " << errMsg << std::endl;
      sqlite3_free(errMsg);
    }
  }
  Fan_Policy(const std::string &_description, const std::string &_policyName,
             const std::string &_algorithm, bool _status,
             const std::string &_TemperatureSource, int _DesiredTemperature) {
    this->policy_type = (POLICY_TYPE::TYPE_FAN);
    this->description = (_description);
    this->policyName = (_policyName);
    this->last_date_time = DB_currentDateTime();
    this->algorithm = (_algorithm);
    this->status = (_status);
    this->desiredTemperature = (_DesiredTemperature);
    this->temperatureSource = (_TemperatureSource);
  }
  bool Enable_Policy(bool status) override { this->status = "OK"; }
  bool Insert_Policy(sqlite3 *db, int energyManagerID) override {
    char query[500];
    int rc;
    char *errMsg = 0;
    // const char *insertFanPolicyQuery =
    //     "INSERT INTO Fan_Policy (PolicyName, Description, Algorithm, "
    //     "DesiredTemperature, TemperatureSource, DATETIME, EnergyManagerID) "
    //     "VALUES('FanPolicy001', 'Sample fan policy', 'Algorithm1', 80, "
    //     "'Sensor1', '2023-08-09 14:30:00', 1);";
    sprintf(query,
            "INSERT INTO Fan_Policy (EnergyManagerID, PolicyName, Description, "
            "Algorithm, DesiredTemperature, TemperatureSource, DATETIME) "
            "VALUES (%d, '%s', '%s', '%s', %d, '%s', '%s');",
            energyManagerID, policyName.c_str(), description.c_str(),
            algorithm.c_str(), getDesiredTemperature(),
            getTemperatureSource().c_str(), DB_currentDateTime().c_str());
    cout << "Insert_Policy" << endl;
    rc = sqlite3_exec(db, query, 0, 0, &errMsg);
    cout << "Insert_Policy1" << endl;
    if (rc != SQLITE_OK) {
      std::cerr << "SQL error: " << errMsg << std::endl;
      sqlite3_free(errMsg);
      return false;
    } else {
      std::cout << "Insert_Fan_Policy successfully" << std::endl;
      return true;
    }
  }

  Fan *getFanByID(const std::string &key) {
    if (Target_Fans.find(key) != Target_Fans.end()) {
      return Target_Fans[key];
    }
    return nullptr;
  }
  // TemperatureSource Getter
  std::string getTemperatureSource() const { return temperatureSource; }

  // TemperatureSource Setter
  void setTemperatureSource(const std::string &source) {
    temperatureSource = source;
    // 저장함수만들어야함
  }

  // DesiredTemperature Getter
  int getDesiredTemperature() const { return desiredTemperature; }

  // DesiredTemperature Setter
  void setDesiredTemperature(int temperature) {
    desiredTemperature = temperature;
    // 저장함수만들어야함
  }
  ~Fan_Policy(){};
};
static int FanPolicyCallback(void *data, int argc, char **argv,
                             char **colNames) {
  if (!data) {
    std::cerr << "FanPolicyCallback: Invalid data pointer" << std::endl;
    return -1; // Return non-zero value to indicate an error
  }

  if (argc != 8) {
    std::cerr << "FanPolicyCallback: Invalid number of columns" << std::endl;
    return -1; // Return non-zero value to indicate an error
  }

  Fan_Policy *fanPolicy = static_cast<Fan_Policy *>(data);

  fanPolicy->poicy_id = std::stoi(argv[0]);
  fanPolicy->policyName = argv[1];
  fanPolicy->description = argv[2];
  fanPolicy->algorithm = argv[3];
  fanPolicy->desiredTemperature = std::stoi(argv[4]);
  fanPolicy->temperatureSource = argv[5];
  fanPolicy->last_date_time = argv[6];
  fanPolicy->energyManagerID = std::stoi(argv[7]);

  return 0;
}