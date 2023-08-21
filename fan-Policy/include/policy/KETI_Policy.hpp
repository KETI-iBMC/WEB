#ifndef F511DF33_036E_452C_8A68_37279B70A447
#define F511DF33_036E_452C_8A68_37279B70A447
#pragma once
#include <new>
#include <policy/Policy.hpp>
#include <unordered_map>

// CREATE TABLE 쿼리문 - EnergySaving
const char *createEnergySavingQuery =
    "CREATE TABLE EnergyManager ("
    "    EnergyManagerID INTEGER PRIMARY KEY AUTOINCREMENT,"
    "    Description TEXT,"
    "    Status TEXT,"
    "    Target TEXT,"
    "    IsActive BOOLEAN,"
    "    DATETIME TEXT"
    ");";

// CREATE TABLE 쿼리문 - Fan
const char *createFanPolicyQuery =
    "CREATE TABLE Fan_Policy ("
    "    FanPolicyID INTEGER PRIMARY KEY AUTOINCREMENT,"
    "    PolicyName TEXT,"
    "    Description TEXT,"
    "    Algorithm TEXT,"
    "    DesiredTemperature INT,"
    "    TemperatureSource TEXT,"
    "    DATETIME TEXT,"
    "    EnergyManagerID INTEGER,"
    "    FOREIGN KEY (EnergyManagerID) REFERENCES "
    "EnergyManager(EnergyManagerID)"
    ");";
// CREATE TABLE 쿼리문 - Fan
const char *createFanTableQuery =
    "CREATE TABLE Fan ("
    "    FanID INTEGER PRIMARY KEY AUTOINCREMENT,"
    "    FanName TEXT,"
    "    PWM INT,"
    "    RPM INT,"
    "    slotNumber INT,"
    "    columnNumber INT,"
    "    chassisName TEXT,"
    "    Manufacturer TEXT,"
    "    Model TEXT,"
    "    MaxPWM INT,"
    "    MaxRPM INT,"
    "    FanController TEXT,"
    "    FanPolicyID INTEGER,"
    "    FOREIGN KEY (FanPolicyID) REFERENCES Fan_Policy(FanPolicyID)"
    ");";
// CREATE TABLE 쿼리문 - RelatedItem
const char *createRelatedItemQuery =
    "CREATE TABLE RelatedItem ("
    "    RelatedItemID INTEGER PRIMARY KEY AUTOINCREMENT,"
    "    FanID INT,"
    "    SensorName TEXT,"
    "    SensorNumber INT,"
    "    DesiredTemperature INT"
    ");";

// CREATE TABLE 쿼리문 - Feedback
const char *createFeedbackQuery =
    "CREATE TABLE Feedback ("
    "    FeedbackID INTEGER PRIMARY KEY AUTOINCREMENT,"
    "    Name TEXT"
    ");";
class KETI_Policy {
private:
  sqlite3 *db;
  KETI_Policy();
  KETI_Policy(KETI_Policy &other);
  ~KETI_Policy() { only_one = false; };
  static bool only_one;
  static KETI_Policy *phoenixInstance;

  static void Create() {
    static KETI_Policy m_instance;
    phoenixInstance = &m_instance;
  }
  static void Distory_KETI() { phoenixInstance->~KETI_Policy(); }
  bool Insert_Energy_Saving_Policy(string des, POLICY_TYPE type, bool isActive);
  bool Insert_Policy(int energyManagerID, Policy *pol);
  bool Insert_Fans(Fan fan);

public:
  void DB_print();
  Policy *Get_Policy(POLICY_TYPE type, int policyID);
  static KETI_Policy &Get_Instance() {
    if (!only_one) {
      new (phoenixInstance) KETI_Policy;
      atexit(Distory_KETI);
      only_one = true;
    } else {
      Create();
    }
    return *phoenixInstance;
  }

  bool Del_Energy_Saving_Disable_Policy();

  void Factory_Info() { cout << "Only One Policy Factory\n" << endl; }
};

#endif /* F511DF33_036E_452C_8A68_37279B70A447 */
