#ifndef POLICY_H
#define POLICY_H
#include "ProcessorPolicy.hpp"
using namespace std;
class PolicyManager{
private:
    vector<ProcessorPolicy> mProcessorPolicies;
public:
    ProcessorPolicy& addProcessorPolicy(const string& name, const string& clock_mode, const int& basic_speed, const int& max_speed);
    ProcessorPolicy& getProcessorPolicy(const string& name);

    ProcessorPolicy& activateProcessorPolicy(const string& name);
    ProcessorPolicy& deactivateProcessorPolicy(const string& name);

    ProcessorPolicy& deleteProcessorPolicy(const string& name);
    void displayAll()const;
    void displayActivate()const;
    void displayDeactivate()const;
    
};
#endif //POLICY_H