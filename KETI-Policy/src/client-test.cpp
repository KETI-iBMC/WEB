#include <policy_proxy.h>
#include <random>
#include <stdint.h>
#include <iostream>
#include <string>
static const char *TEST_SERVER_NAME = "org.freedesktop.keti.bmc.policy";
static const char *TEST_SERVER_PATH = "/org/freedesktop/keti/bmc/policy";

struct Student {
    std::string name;
    int32_t age;
    std::string phone_number;
};

class Policy_Proxy : public org::freedesktop::keti::bmc::policy_proxy,
                    public DBus::IntrospectableProxy,
                    public DBus::ObjectProxy {
public:
    Policy_Proxy(DBus::Connection &connection, const char *path,
                        const char *name): DBus::ObjectProxy(connection, path, name) {}
    ~Policy_Proxy(){};
    
};

struct Test {
    string rr
    int std::fisher_f_distribution<>
    int
}

int main() {
    ::DBus::Struct< std::string, int32_t, int32_t, int32_t, int32_t, std::string > Fan;
    ::DBus::Struct< std::string, std::string, std::string, int32_t, std::string, std::string > FanPolicy;
    ::DBus::Struct< int32_t, std::string > TargetFan;
    ::DBus::BusDispatcher dispatcher;
    ::DBus::default_dispatcher = &dispatcher;
    ::DBus::Connection conn_n = DBus::Connection::SystemBus();
    Policy_Proxy dbus_adap_test = Policy_Proxy(conn_n, TEST_SERVER_PATH, TEST_SERVER_NAME);
    std::cout << "-------------------------------" << std::endl;    
    std::cout << "서버 연결 요청" << std::endl;
    std::cout << "-------------------------------" << std::endl;
    int result;
    std::string input = "";
    std::cout << "getFan, getFanTargetPolicy, getFanPolicy" << std::endl; 
    std::cout << "setFan, setFanPolicyString, setFanPolicyInt" << std::endl;
    std::cout << "createFanPolicy, deleteFanPolicy" << std::endl;
    while (1) {
        std::cin >> input ;
        if (input == "getFan") {
            std::string name;
            std::cout << "FanName : ";
            std::cin >> name ;
            Fan = dbus_adap_test.getFan(name);
            if (Fan._1.empty()) {
                std::cout << "Does not exist" << std::endl;
            } else {
                std::cout << Fan._1 << std::endl;
                std::cout << Fan._6 << std::endl;                        
            }
        } else if (input == "getFanTargetPolicy") {
            std::string policy_name;
            std::cout << "PolicyName : ";
            std::cin >> policy_name;
            TargetFan = dbus_adap_test.getFanTargetPolicy(policy_name);
            if (TargetFan._1 == 0) {
                std::cout << "Does not exist" << std::endl;
            } else {
                std::cout << "Size : " << TargetFan._1 << ", " ;
                std::cout << "TargetFan : " << TargetFan._2 << std::endl;        
            }
        } else if (input == "getFanPolicy") {
            std::string policy_name;
            std::cout << "PolicyName : ";
            std::cin >> policy_name;
            FanPolicy =  dbus_adap_test.getFanPolicy(policy_name);
            if (FanPolicy._1.empty()) {
                std::cout << "Does not exist" << std::endl;
            } else {
                std::cout << FanPolicy._1 << std::endl;
                std::cout << FanPolicy._2 << std::endl;
                std::cout << FanPolicy._3 << std::endl;
                std::cout << FanPolicy._4 << std::endl;
                std::cout << FanPolicy._5 << std::endl;
                std::cout << FanPolicy._6 << std::endl;            
            }
        } else if (input == "setFan") {
            std::string name;
            std::string policy_name;
            std::cout << "FanName : ";
            std::cin >> name;
            std::cout << "Name of the policy to change : ";
            std::cin >> policy_name;
            result = dbus_adap_test.setFan(name, policy_name);
            if (result == 0) {
                std::cout << "Fan updated successfully" << std::endl;
            } else {
                std::cout << "Does not exist" << std::endl;
            }
        } else if (input == "setFanPolicyString") {
            std::string policy_name;
            std::string attribute;
            std::string attribute_value;
            std::cout << "Policy Name : ";
            std::cin >> policy_name;
            std::cout << "Attribute : ";
            std::cin >> attribute;        
            std::cout << "Name of the attribute to change : ";
            std::cin >> attribute_value;
            result = dbus_adap_test.setFanPolicyString(policy_name, attribute, attribute_value);
            if (result == 0) {
                std::cout << "Fan Policy updated successfully" << std::endl;
            } else {
                std::cout << "Does not exist" << std::endl;
            }    
        } else if (input == "setFanPolicyInt") {
            std::string policy_name;
            std::string attribute;
            int32_t attribute_value;
            std::cout << "Policy Name : ";
            std::cin >> policy_name;
            std::cout << "Attribute : ";
            std::cin >> attribute;        
            std::cout << "Value of the attribute to change : ";
            std::cin >> attribute_value;
            result = dbus_adap_test.setFanPolicyInt(policy_name, attribute, attribute_value);
            if (result == 0) {
                std::cout << "Fan Policy updated successfully" << std::endl;
            } else {
                std::cout << "Does not exist" << std::endl;
            }         
        } else if (input == "createFanPolicy") {
            std::string description;
            std::string policy_name;
            std::string algorithm;
            std::string temperature_source;
            int desired_temperature;
            std::cout << "Description : ";
            std::cin >> description;
            std::cout << "Policy Name : ";
            std::cin >> policy_name;
            std::cout << "Algorithm : ";
            std::cin >> algorithm;
            std::cout << "Temperature Source : ";
            std::cin >> temperature_source;
            std::cout << "Desired Temperature : ";
            std::cin >> desired_temperature; 
            result = dbus_adap_test.createFanPolicy(description, policy_name, algorithm, temperature_source, desired_temperature);
            if (result == 1) {
                std::cout << "Fan Policy created successfully" << std::endl;
            } else {
                std::cout << "Failed to create" << std::endl;
            }
        } else if (input == "deleteFanPolicy") {
            std::string policyName;
            std::cout << "Policy Name : ";
            std::cin >> policyName;
            result = dbus_adap_test.deleteFanPolicy(policyName);
            if (result == 1) {
                std::cout << "Fan Policy deleted successfully" << std::endl;
            } else {
                std::cout << "Failed to delete fan policy" << std::endl;
            }
        } else {
            std::cout << "Invalid Input" << std::endl;
        }
    }
    return 0;
}

// std::cout << "-------------------setFan(Fan1, FanPolicy2) call-------------------" << std::endl;
// result = dbus_adap_test.setFan("Fan1", "FanPolicy2");
// std::cout << "-------------------getFan(Fan1) call-------------------" << std::endl;        
// Fan = dbus_adap_test.getFan("Fan1");
// std::cout << Fan._1 << std::endl;
// std::cout << Fan._2 << std::endl;
// std::cout << Fan._3 << std::endl;
// std::cout << Fan._4 << std::endl;
// std::cout << Fan._5 << std::endl;
// std::cout << Fan._6 << std::endl;
// std::cout << "-------------------getFan(Fan2) call-------------------" << std::endl;  
// Fan = dbus_adap_test.getFan("Fan2");
// std::cout << Fan._1 << std::endl;
// std::cout << Fan._6 << std::endl;
// std::cout << "-------------------getFan(Fan3) call-------------------" << std::endl;        
// Fan = dbus_adap_test.getFan("Fan3");
// std::cout << Fan._1 << std::endl;
// std::cout << Fan._6 << std::endl;
// std::cout << "-------------------getFan(Fan4) call-------------------" << std::endl;        
// Fan = dbus_adap_test.getFan("Fan4");
// std::cout << Fan._1 << std::endl;
// std::cout << Fan._6 << std::endl;
// std::cout <<"-------------------setFanPolicyString(FanPolicy1, Algorithm, BFC) call-------------------" << std:: endl;
// result = dbus_adap_test.setFanPolicyString("FanPolicy1", "Algorithm", "BFC"); 
// std::cout << "-------------------getFanTargetPolicy(FanPolicy2) call-------------------" << std::endl; 
// TargetFan = dbus_adap_test.getFanTargetPolicy("FanPolicy2");
// std::cout << "Size : " << TargetFan._1 << ", " <<;
// std::cout << "TargetFan : " << TargetFan._2 << std::endl;
// std::cout << "-------------------createFanPolicy(new FanPolicy., FanPolicy3, hj, Sensor3, 60) call-------------------" << std:: endl;
// result = dbus_adap_test.createFanPolicy("new FanPolicy.", "FanPolicy3", "hj", "Sensor3", 60);
// std::cout << "-------------------getFanPolicy(FanPolicy3)-------------------" << std:: endl;
// FanPolicy = dbus_adap_test.getFanPolicy("FanPolicy3");
// std::cout << FanPolicy._1 << std:: endl;
// std::cout << FanPolicy._2 << std:: endl;
// std::cout << FanPolicy._3 << std:: endl;
// std::cout << FanPolicy._4 << std:: endl;
// std::cout << FanPolicy._5 << std:: endl;

// std::cout << "-------------------deleteFanPolicy(FanPolicy2)-------------------" << std:: endl;
// result = dbus_adap_test.deleteFanPolicy("FanPolicy2") ;
// std::cout <<  << std:: endl;
// std::cout << "-------------------getFanPolicy(FanPolicy2)-------------------" << std:: endl;
// std::cout << "-------------------getFan(FanPolicy2)-------------------" << std:: endl;
