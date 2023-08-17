#include "ProcessorPolicy.hpp"

ProcessorPolicy::ProcessorPolicy(){}
//하나의 프로세서를 나타내는 클래스
ProcessorPolicy::ProcessorPolicy(const string name, const string clock_mode, const int basic_speed, const int max_speed) : mname(name), mclock_mode(clock_mode), mmax_speed(max_speed), mbasic_speed(basic_speed){}

    
void ProcessorPolicy::set_name(string name){
    mname = name;
}
const string ProcessorPolicy::get_name() const{
    return mname;
}

string ProcessorPolicy::set_clock_mode(string clock_mode){
    mclock_mode = clock_mode;
}
const string ProcessorPolicy::get_clock_mode() const{
    return mclock_mode;
}
void ProcessorPolicy::set_basic_speed(int basic_speed){
    mbasic_speed=basic_speed;
}
const int ProcessorPolicy::get_basic_speed() const{
    return mbasic_speed;
}

void ProcessorPolicy::set_max_speed(int max_speed){
    mmax_speed=max_speed;
}
const int ProcessorPolicy::get_max_speed() const {
    return mmax_speed;
}
void ProcessorPolicy::policy_display() const {
    cout << "Name : " << get_name() << endl; 
    cout << "Clock Mode : " << get_clock_mode()  << endl;  
    cout << "Basic Speed : " << get_basic_speed()  << endl;  
    cout << "Max Speed : " << get_max_speed() << endl; 
    cout << (mis_activate()? "Activate" : "Deactivate") << endl;

}
