#include <iostream>

#include "PolicyManager.hpp"
#include "ProcessorPolicy.hpp"

using namespace std;
int displayMenu();
void doAddPolicy(PolicyManager& db);
void doDeletePolicy(PolicyManager& db);
void doActivate(PolicyManager& db);
void doDeactivate(PolicyManager& db);

int main(){
    PolicyManager processor_policy_db;
    bool done = false;
    processor_policy_db.addProcessorPolicy("HostProcessor1","UnderClock",1000,1200);
    processor_policy_db.addProcessorPolicy("HostProcessor2","OverClock",1200,1400);
    processor_policy_db.addProcessorPolicy("BMCProcessor1","BasicClock",1400,1600);

    processor_policy_db.activateProcessorPolicy("HostProcessor1");
    processor_policy_db.activateProcessorPolicy("HostProcessor2");
    processor_policy_db.activateProcessorPolicy("BMCProcessor1");
    while(!done){
        int option = displayMenu();
        switch (option){
        case 0:
            done = true;
            break;
        case 1:
            doAddPolicy(processor_policy_db);
            break;
        case 2:
            doDeletePolicy(processor_policy_db);
            break;
        case 3:
            doActivate(processor_policy_db);
            break;
        case 4:
            doDeactivate(processor_policy_db);
            break;
        case 5:
            processor_policy_db.displayAll();
            break;
        case 6:
            processor_policy_db.displayActivate();
            break;  
        case 7:
            processor_policy_db.displayDeactivate();
            break;              
        default:
            cerr << "Unknown Comman" << endl;
            break;
        }
        
    }
    return 0;
}
int displayMenu(){
    int option;
    cout << "policy_DB" << endl << "-------------------------" << endl;
    cout << "1) policy add" << endl;
    cout << "2) policy delete" << endl;
    cout << "3) policy activate" << endl;
    cout << "4) policy deactivate" << endl;
    cout << "5) display All" << endl;
    cout << "6) display Active" << endl;
    cout << "7) display Deactive" << endl;
    cout << "0) quit" << endl;

    cin >> option ;
    return option;
}
void doAddPolicy(PolicyManager& db){
    string name, clock_mode;
    int basic_speed, max_speed;
    cout << "name: ";
    cin >> name;
    cout << "clock mode: ";
    cin >> clock_mode;
    cout << "basic speed: ";
    cin >> basic_speed;
    cout << "max speed: ";
    cin >> max_speed;
    db.addProcessorPolicy(name, clock_mode, basic_speed, max_speed);
    db.activateProcessorPolicy(name);
}
void doDeletePolicy(PolicyManager& db){
    string name;
    cout << "name: " ;
    cin >> name;
    db.deleteProcessorPolicy(name);
}
void doActivate(PolicyManager& db){
    string name;
    cout << "name: ";
    cin >> name;
    db.activateProcessorPolicy(name);
}
void doDeactivate(PolicyManager& db){
    string name;
    cout << "name : ";
    cin >> name;
    db.deactivateProcessorPolicy(name);
}