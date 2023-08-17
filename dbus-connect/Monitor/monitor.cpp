#include "monitor.hpp"

#include <dbus-c++-1/dbus-c++/interface.h>
#include <dbus-c++-1/dbus-c++/message.h>

#include <string>

#ifdef HAVE_CONFIG_H
#include <config.h>
#endif

using namespace std;

#include <unistd.h>
#include <thread>
#include <iostream>

DBus::BusDispatcher dispatcher;

Monitor_Adaptor::Monitor_Adaptor(DBus::Connection &connection)
    : DBus::ObjectAdaptor(connection, MONITOR_SERVER_PATH) {}

int32_t Monitor_Adaptor::monitor_ibmc() {
  cout << "ibmc에서 온 요청 수행 " << endl;
  return 1;
}

int32_t Monitor_Adaptor::monitor_policy() {
  cout << "policy에서 온 요청 수행 : " << endl;
  return 1;
}

int32_t Monitor_Adaptor::monitor_feedback() {
  cout << "feedback에서 온 요청 수행 : " << endl;
  return 1;
}
int32_t Monitor_Adaptor::monitor_energy() {
  cout << "energy에서 온 요청 수행 : " << endl;
  return 1;
}
int32_t Monitor_Adaptor::monitor_ssp() {
  cout << "ssp에서 온 요청 수행 : " << endl;
  return 1;
}
//-----------------------------Feedback_Adaptor클래스끝-----------------------------
Ibmc_Proxy::Ibmc_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Ibmc_Proxy클래스끝-----------------------------
Policy_Proxy::Policy_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Policy_Proxy클래스끝-----------------------------
Feedback_Proxy::Feedback_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Feedback_Proxy클래스끝-----------------------------
Energy_Proxy::Energy_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Energy_Proxy클래스끝-----------------------------
Ssp_Proxy::Ssp_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Ssp_Proxy클래스끝-----------------------------
void run_monitor_server(){
  std::cout << "Monitor Server Start " << std::endl;
  DBus::default_dispatcher = &dispatcher;

  DBus::Connection conn = DBus::Connection::SystemBus();
  conn.request_name(MONITOR_SERVER_NAME);

  Monitor_Adaptor server(conn);
  // 서버 유지
  dispatcher.enter();
}
void monitor(){
  string option="";
  while(true){
    cout << "[ ibmc | policy | feedback | energy | ssp ] : " << endl;
    cin >> option ;
    if(option =="ibmc"){
      cout << "ibmc에 연결을 요청합니다." << endl;
      connect_to_ibmc_server();
    }
    else if (option == "policy"){
      cout << "policy에 연결을 요청합니다." << endl;
      connect_to_policy_server();
    }
    else if(option == "feedback"){
      cout << "feedback에 연결을 요청합니다." << endl;
      connect_to_feedback_server();
    }
    else if(option == "energy"){
      cout << "energy에 연결을 요청합니다." << endl;
      connect_to_energy_server();
    }else if(option == "ssp"){
      cout << "ssp에 연결을 요청합니다." << endl;
      connect_to_ssp_server();
    }
    else {
      cout << "다시 입력하세요" << endl;
    }
  }
}
void connect_to_ibmc_server(){
    DBus::BusDispatcher dispatcher;
  DBus::default_dispatcher = &dispatcher;
  DBus::Connection conn_n = DBus::Connection::SystemBus();
  Ibmc_Proxy dbus_adap_test =
      Ibmc_Proxy(conn_n, IBMC_SERVER_PATH, IBMC_SERVER_NAME);
  cout << "-------------------------------" << endl;    
  cout << "ibmc 서버 연결 요청" << endl;
  cout << "-------------------------------" << endl;
  dbus_adap_test.ibmc_monitor();
}
void connect_to_policy_server(){
    DBus::BusDispatcher dispatcher;
  DBus::default_dispatcher = &dispatcher;
  DBus::Connection conn_n = DBus::Connection::SystemBus();
  Policy_Proxy dbus_adap_test =
      Policy_Proxy(conn_n, POLICY_SERVER_PATH, POLICY_SERVER_NAME);
  cout << "-------------------------------" << endl;    
  cout << "policy 서버 연결 요청" << endl;
  cout << "-------------------------------" << endl;
  dbus_adap_test.policy_monitor();
}
void connect_to_feedback_server(){
    DBus::BusDispatcher dispatcher;
  DBus::default_dispatcher = &dispatcher;
  DBus::Connection conn_n = DBus::Connection::SystemBus();
  Feedback_Proxy dbus_adap_test =
      Feedback_Proxy(conn_n, FEEDBACK_SERVER_PATH, FEEDBACK_SERVER_NAME);
  cout << "-------------------------------" << endl;    
  cout << "feedback 서버 연결 요청" << endl;
  cout << "-------------------------------" << endl;
  dbus_adap_test.feedback_monitor();
}
void connect_to_energy_server(){
    DBus::BusDispatcher dispatcher;
  DBus::default_dispatcher = &dispatcher;
  DBus::Connection conn_n = DBus::Connection::SystemBus();
  Energy_Proxy dbus_adap_test =
      Energy_Proxy(conn_n, ENERGY_SERVER_PATH, ENERGY_SERVER_NAME);
  cout << "-------------------------------" << endl;    
  cout << "energy 서버 연결 요청" << endl;
  cout << "-------------------------------" << endl;
  dbus_adap_test.energy_monitor();
}
void connect_to_ssp_server(){
    DBus::BusDispatcher dispatcher;
  DBus::default_dispatcher = &dispatcher;
  DBus::Connection conn_n = DBus::Connection::SystemBus();
  Ssp_Proxy dbus_adap_test =
      Ssp_Proxy(conn_n, SSP_SERVER_PATH, SSP_SERVER_NAME);
  cout << "-------------------------------" << endl;    
  cout << "ssp 서버 연결 요청" << endl;
  cout << "-------------------------------" << endl;
  dbus_adap_test.ssp_monitor();
}
int main() {
  std::thread monitor_server_thread(run_monitor_server);
  std::thread monitor_thread(monitor);
  //모니터서버 연결 함수 
  monitor_server_thread.join();
  monitor_thread.join();
  

  return 0;
}