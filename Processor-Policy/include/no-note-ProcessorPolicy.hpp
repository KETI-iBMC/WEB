#ifndef PROCESSORPOLICY_H
#define PROCESSORPOLICY_H
#include <exception>
#include <fcntl.h>
#include <iostream>
#include <ostream>
#include <stdio.h>
#include <vector>
#include <map>
#include <istream>
#include "../src/Policy.cpp"
using namespace std;
class ProcessorPolicy : public Policy { 
private:
    string mname;
    string mclock_mode;
    int mbasic_speed;
    int mmax_speed;

public:
    ProcessorPolicy();
    ProcessorPolicy(const string name, const string clock_mode, const int basic_speed , const int max_speed);
    
    void set_name(string name);
    const string get_name() const;

    string set_clock_mode(string clock_mode);
    const string get_clock_mode() const;

    void set_basic_speed(int basic_speed);
    const int get_basic_speed() const;

    void set_max_speed(int max_speed);
    const int get_max_speed() const;

    void policy_display() const override;

};
#endif // PROCESSORPOLICY_H