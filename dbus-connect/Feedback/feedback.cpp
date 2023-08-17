#include "feedback.hpp"

#include <dbus-c++-1/dbus-c++/interface.h>
#include <dbus-c++-1/dbus-c++/message.h>

#include <string>

#ifdef HAVE_CONFIG_H
#include <config.h>
#endif

using namespace std;
#include <signal.h>
#include <unistd.h>
#include <thread>
#include <iostream>

DBus::BusDispatcher dispatcher;

Feedback_Adaptor::Feedback_Adaptor(DBus::Connection &connection)
    : DBus::ObjectAdaptor(connection, FEEDBACK_SERVER_PATH) {}

int32_t Feedback_Adaptor::feedback_ibmc() {
  cout << "ibmc에서 온 요청 수행 " << endl;
  return 1;
}

int32_t Feedback_Adaptor::feedback_policy() {
  cout << "policy에서 온 요청 수행 : " << endl;
  return 1;
}
int32_t Feedback_Adaptor::feedback_monitor() {
  cout << "monitor에서 온 요청 수행 : " << endl;
  return 1;
}
int32_t Feedback_Adaptor::feedback_energy() {
  cout << "energy에서 온 요청 수행 : " << endl;
  return 1;
}
int32_t Feedback_Adaptor::feedback_ssp() {
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
Monitor_Proxy::Monitor_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Monitor_Proxy클래스끝-----------------------------
Energy_Proxy::Energy_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Energy_Proxy클래스끝-----------------------------
Ssp_Proxy::Ssp_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Ssp_Proxy클래스끝-----------------------------
void run_feedback_server(){
  std::cout << "feedback Server Start " << std::endl;
  DBus::default_dispatcher = &dispatcher;

  DBus::Connection conn = DBus::Connection::SystemBus();
  conn.request_name(FEEDBACK_SERVER_NAME);

  Feedback_Adaptor server(conn);
  // 서버 유지
  dispatcher.enter();
}
void feedback(){
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
      cout << "monitor에 연결을 요청합니다." << endl;
      connect_to_monitor_server();
    }
    else if(option == "energy"){
      cout << "energy에 연결을 요청합니다." << endl;
      connect_to_energy_server();
    }
    else if(option == "ssp"){
      cout << "sspy에 연결을 요청합니다." << endl;
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
  dbus_adap_test.ibmc_feedback();
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
  dbus_adap_test.policy_feedback();
}
void connect_to_monitor_server(){
    DBus::BusDispatcher dispatcher;
  DBus::default_dispatcher = &dispatcher;
  DBus::Connection conn_n = DBus::Connection::SystemBus();
  Monitor_Proxy dbus_adap_test =
      Monitor_Proxy(conn_n, MONITOR_SERVER_PATH, MONITOR_SERVER_NAME);
  cout << "-------------------------------" << endl;    
  cout << "monitor 서버 연결 요청" << endl;
  cout << "-------------------------------" << endl;
  dbus_adap_test.monitor_feedback();
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
  dbus_adap_test.energy_feedback();
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
  dbus_adap_test.ssp_feedback();
}
int main() {
  std::thread feedback_server_thread(run_feedback_server);
  std::thread feedback_thread(feedback);
  //feedback서버 연결 함수 
  feedback_server_thread.join();
  feedback_thread.join();
  

  return 0;
}