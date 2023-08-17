#include "ibmc.hpp"

#include <dbus-c++-1/dbus-c++/interface.h>
#include <dbus-c++-1/dbus-c++/message.h>
#include <unistd.h>
#include <fstream>
#include <string>
#include <thread>
using namespace std;

DBus::BusDispatcher dispatcher;

Ibmc_Adaptor::Ibmc_Adaptor(DBus::Connection &connection)
    : DBus::ObjectAdaptor(connection, IBMC_SERVER_PATH) {}
int32_t Ibmc_Adaptor::ibmc_policy() {
  cout << "policy에서 입력이 옴" << endl;
  return 1;
}
int32_t Ibmc_Adaptor::ibmc_feedback() {
  cout << "feedback에서 입력옴" << endl;
  return 1;
}
int32_t Ibmc_Adaptor::ibmc_monitor() {
  cout << "monitor에서 입력옴" << endl;
  return 1;
}
int32_t Ibmc_Adaptor::ibmc_energy() {
  cout << "energy에서 입력옴" << endl;
  return 1;
}
int32_t Ibmc_Adaptor::ibmc_ssp() {
  cout << "ssp에서 입력옴" << endl;
  return 1;
}
//-----------------------------Ibmc_Adaptor클래스끝-----------------------------
Feedback_Proxy::Feedback_Proxy(DBus::Connection &connection, const char *path,
                       const char *name)
    : DBus::ObjectProxy(connection, path, name) {}
//-----------------------------Feedback_Proxy클래스끝-----------------------------
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
void connect_to_policy_server(){
    DBus::BusDispatcher dispatcher;
  DBus::default_dispatcher = &dispatcher;
  DBus::Connection conn_n = DBus::Connection::SystemBus();
  Policy_Proxy dbus_adap_test =
      Policy_Proxy(conn_n, POLICY_SERVER_PATH, POLICY_SERVER_NAME);
  cout << "-------------------------------" << endl;    
  cout << "policy 서버 연결 요청" << endl;
  cout << "-------------------------------" << endl;
  dbus_adap_test.policy_ibmc();
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
  dbus_adap_test.feedback_ibmc();
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
  dbus_adap_test.monitor_ibmc();
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
  dbus_adap_test.energy_ibmc();
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
  dbus_adap_test.ssp_ibmc();
}
void run_ibmc_server() {
  std::cout << " Ibmc Server Start " << std::endl;
  DBus::default_dispatcher = &dispatcher;

  DBus::Connection conn = DBus::Connection::SystemBus();
  conn.request_name(IBMC_SERVER_NAME);

  Ibmc_Adaptor server(conn);
  
  dispatcher.enter();
  
}
void ibmc(){
  string option="";
  while(true){
    cout << "[ policy | feedback | monitor | energy | ssp ] : " << endl;
    cin >> option ;
    if(option =="policy"){
      cout << "policy에 연결을 요청합니다." << endl;
      connect_to_policy_server();
    }
    else if (option == "feedback"){
      cout << "feedback에 연결을 요청합니다." << endl;
      connect_to_feedback_server();
    }
    else if (option == "monitor"){
      cout << "monitor에 연결을 요청합니다." << endl;
      connect_to_monitor_server();
    }
    else if (option == "energy"){
      cout << "energy에 연결을 요청합니다." << endl;
      connect_to_energy_server();
    }
    else if (option == "ssp"){
      cout << "ssp에 연결을 요청합니다." << endl;
      connect_to_ssp_server();
    }
    else {
      cout << "다시 입력하세요" << endl;
    }
  }
}
int main(){
  std::thread ibmc_server_thread(run_ibmc_server);
  std::thread ibmc_thread(ibmc);
  ibmc_server_thread.join();
  ibmc_thread.join();
}