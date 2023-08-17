#include "PolicyManager.hpp"
#include "ProcessorPolicy.hpp"

ProcessorPolicy& PolicyManager::addProcessorPolicy(const string& name, const string& clock_mode, const int& basic_speed, const int& max_speed){
    ProcessorPolicy newProcessorPolicy(name, clock_mode, basic_speed, max_speed);
    mProcessorPolicies.push_back(newProcessorPolicy);
    return mProcessorPolicies[mProcessorPolicies.size()-1]; 
}

ProcessorPolicy& PolicyManager::getProcessorPolicy(const string& name){

    for(auto& processorPolicy : mProcessorPolicies){
        if(processorPolicy.get_name() == name){
            cout << processorPolicy.get_name() << " , " << processorPolicy.get_clock_mode() << " , " << processorPolicy.get_max_speed() << endl;
            return processorPolicy;
        }
    }

    static ProcessorPolicy defaultProcessorPolicy;  
    cout << name << "없음" << endl; 
    return defaultProcessorPolicy; 
}
ProcessorPolicy& PolicyManager::activateProcessorPolicy(const string& name){
    for(auto& processorPolicy:mProcessorPolicies){
        if(processorPolicy.get_name() == name){
            processorPolicy.m_activate();
            return processorPolicy;
        }
    }
    static ProcessorPolicy defaultProcessorPolicy;  
    cout << name << "없음" << endl; 
}
ProcessorPolicy& PolicyManager::deactivateProcessorPolicy(const string& name){
    for(auto& processorPolicy:mProcessorPolicies){
        if(processorPolicy.get_name() == name){
            processorPolicy.m_deactivate();
            return processorPolicy;
        }
    }
    static ProcessorPolicy defaultProcessorPolicy;  
    cout << name << "없음" << endl; 
}
ProcessorPolicy& PolicyManager::deleteProcessorPolicy(const string& name){
    for(auto it = mProcessorPolicies.begin(); it != mProcessorPolicies.end(); ++it){
        if(it->get_name() == name){
            mProcessorPolicies.erase(it);
            return *it;
        }
    }
    static ProcessorPolicy defaultProcessorPolicy;  
    cout << name << "없음" << endl; 
}
void PolicyManager::displayAll()const{
    for(auto& processorPolicy: mProcessorPolicies){
        processorPolicy.policy_display();
    }
}

void PolicyManager::displayActivate()const{
    for(auto& processorPolicy: mProcessorPolicies){
        if(processorPolicy.mis_activate()){
            processorPolicy.policy_display();
        }
    }
}
void PolicyManager::displayDeactivate()const{
    for(auto& processorPolicy: mProcessorPolicies){
        if(!processorPolicy.mis_activate()){
            processorPolicy.policy_display();
        }
    }
}