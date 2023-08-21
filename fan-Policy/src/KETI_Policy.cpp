#include <policy/KETI_Policy.hpp>
#include <policy/policy_adaptor.hpp>

KETI_Policy *KETI_Policy::phoenixInstance = NULL;
bool KETI_Policy::only_one = true;
const std::string DB_currentDateTime() {
  time_t now = time(0); // 현재 시간을 time_t 타입으로 저장
  struct tm tstruct;
  char buf[80];
  tstruct = *localtime(&now);
  // strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M",&tstruct); //
  // YYYY-MM-DD.HH:mm:ss 형태의 스트링
  strftime(buf, sizeof(buf), "%Y-%m-%d %X",
           &tstruct); // YYYY-MM-DD HH:mm:ss 형태의 스트링

  return buf;
}
int check_table_db_callback(void *NotUsed, int argc, char **argv,
                            char **azColName) {
  if (argv[0] != NULL) {
    *((int *)NotUsed) = atoi(argv[0]);
  }

  return 0;
}
// 콜백 함수
static int print_callback(void *data, int argc, char **argv, char **azColName) {
  for (int i = 0; i < argc; i++) {
    std::cout << azColName[i] << ": " << (argv[i] ? argv[i] : "NULL")
              << std::endl;
  }
  return 0;
}

KETI_Policy::KETI_Policy() {
  log(info) << "KETI_Policy Init " << endl;
  char *err_msg = 0;
  char query[500] = {0};
  int callback_value = 0;
  int rc = sqlite3_open(LOG_DB, &db);
  sprintf(query,
          "SELECT COUNT(*) FROM sqlite_master where name=\"EnergyManager\";");
  rc = sqlite3_exec(db, query, check_table_db_callback, &callback_value,
                    &err_msg);
  sqlite3_exec(db, query, 0, 0, &err_msg);
  if (callback_value == 0) {
    sprintf(query, createEnergySavingQuery);
    sqlite3_exec(db, query, 0, 0, &err_msg);
    Insert_Energy_Saving_Policy("test", POLICY_TYPE::TYPE_FAN, true);
    cout << "EnergyManager init" << endl;
  }
  callback_value = 0;
  sprintf(query,
          "SELECT COUNT(*) FROM sqlite_master where name=\"Fan_Policy\";");
  rc = sqlite3_exec(db, query, check_table_db_callback, &callback_value,
                    &err_msg);
  sqlite3_exec(db, query, 0, 0, &err_msg);
  if (callback_value == 0) {

    sprintf(query, createFanPolicyQuery);
    rc = sqlite3_exec(db, query, 0, 0, &err_msg);

    Fan_Policy fanPolicy("Sample fan policy", "FanPolicy001", "Algorithm1",
                         true, "Sensor1", 80);
    if (rc != SQLITE_OK) {
      std::cerr << "SQL error: " << err_msg << std::endl;
      sqlite3_free(err_msg);
    }
    Insert_Policy(1, &fanPolicy);
    log(info) << "fanPolicy 생성 완료";
  }
  callback_value = 0;
  sprintf(query, "SELECT COUNT(*) FROM sqlite_master where name=\"Fan\";");
  log(info) << "fan 생성";
  rc = sqlite3_exec(db, query, check_table_db_callback, &callback_value,
                    &err_msg);
  sqlite3_exec(db, query, 0, 0, &err_msg);
  if (callback_value == 0) {
    sprintf(query, createFanTableQuery);
    rc = sqlite3_exec(db, query, 0, 0, &err_msg);
    if (rc != SQLITE_OK) {
      std::cerr << "SQL error: " << err_msg << std::endl;
      sqlite3_free(err_msg);
    }
    Fan fan1(1, "Fan1", 50, 100, 2000, 1800, "ModelA", "ManufacturerA", "pid",
             1, 2, "KETI_CHASSIS", 1);
    Insert_Fans(fan1);
  }
}
void KETI_Policy::DB_print() {
  char *err_msg = 0;
  char query[500] = {0};
  int callback_value = 0;
  int rc = 0;
  sprintf(query, "SELECT * FROM EnergySavingPolicy;");
  rc = sqlite3_exec(db, query, check_table_db_callback, &print_callback,
                    &err_msg);
  sprintf(query, "SELECT * FROM Fan_Policy;");
  rc = sqlite3_exec(db, query, check_table_db_callback, &print_callback,
                    &err_msg);
  sprintf(query, "SELECT * FROM Fan;");
  rc = sqlite3_exec(db, query, check_table_db_callback, &print_callback,
                    &err_msg);
}
/**
 * @brief Insert_Energy_Saving_Policy  테이블생성 현재는 단 한개의 테이블만 이
 * 존재해야함으로 외부생성금지
 *
 * @param des
 * @param type
 * @param isActive
 * @return true
 * @return false
 */
bool KETI_Policy::Insert_Energy_Saving_Policy(string des, POLICY_TYPE type,
                                              bool isActive) {
  char query[500];
  char *errMsg = 0;
  int rc;
  string currentDateTime = DB_currentDateTime();

  const char *deactivateQuery =
      "UPDATE EnergyManager SET IsActive = 0, Status = 'disable';";

  rc = sqlite3_exec(db, deactivateQuery, 0, 0, &errMsg);

  if (rc != SQLITE_OK) {
    std::cerr << "SQL error: " << errMsg << std::endl;
    sqlite3_free(errMsg);
    return false;
  }

  sprintf(query,
          "INSERT INTO EnergyManager (Description, DATETIME, "
          "Status, Target, IsActive) "
          "VALUES('%s', '%s', '%s', '%s', %d);",
          des.c_str(), currentDateTime.c_str(), "NEW",
          PolicyoString(type).c_str(), isActive);
  rc = sqlite3_exec(db, query, 0, 0, &errMsg);

  if (rc != SQLITE_OK) {
    std::cerr << "SQL error: " << errMsg << std::endl;
    sqlite3_free(errMsg);
    return false;
  } else {
    std::cout << "Data inserted successfully" << std::endl;
    return true;
  }
}
bool KETI_Policy::Del_Energy_Saving_Disable_Policy() {
  char *errMsg = 0;
  int rc;

  // IsActive가 0인 데이터 삭제 쿼리 실행
  const char *deleteQuery = "DELETE FROM EnergyManager WHERE IsActive = 0;";

  rc = sqlite3_exec(db, deleteQuery, 0, 0, &errMsg);

  if (rc != SQLITE_OK) {
    std::cerr << "SQL error: " << errMsg << std::endl;
    sqlite3_free(errMsg);
    return false;
  } else {
    std::cout << "Disabled policies deleted successfully" << std::endl;
    return true;
  }
}
bool KETI_Policy::Insert_Policy(int energyManagerID, Policy *pol) {
  char query[500];
  int rc;
  char *errMsg = 0;
  // type fan일경우
  if (pol->policy_type == POLICY_TYPE::TYPE_FAN) {
    Fan_Policy *fanPol = dynamic_cast<Fan_Policy *>(pol);
    if (fanPol) {
      fanPol->Insert_Policy(db, energyManagerID);
      return false;
    } else {
      log(info) << "Fan_Policy Not polymorphic";
    }

  } else if (pol->policy_type == POLICY_TYPE::TYPE_CPU) {
    log(info) << "효정구현";
  }
}
/**
 * @brief Policy는 new이니 사용후 delete 할껏. 선언한 정책을 가져오는 함수
 *
 * @param type
 * @param policyID
 * @return * Policy*
 */
Policy *KETI_Policy::Get_Policy(POLICY_TYPE type, int policyID) {

  Policy *return_pol = nullptr;
  if (POLICY_TYPE::TYPE_FAN == type) {
    return_pol = new Fan_Policy(db, policyID);

    return nullptr;
  }
}
bool KETI_Policy::Insert_Fans(Fan fan) { fan.Insert_Fan(db, 1); }
int main() {
  KETI_Policy::Get_Instance().Factory_Info();
  cout << "ttest" << endl;

  return 0;
}
