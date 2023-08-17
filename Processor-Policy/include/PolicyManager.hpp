#ifndef POLICY_H
#define POLICY_H
#include "ProcessorPolicy.hpp"
using namespace std;
//프로세서들을 관리
class PolicyManager{
    private:
    //프로세서 클래스 벡터로 만듦
    vector<ProcessorPolicy> mProcessorPolicies;
    
    //원래 바로 초기화가 안됨 
    public:
    //Processsor에 속성으로 프로세서 추가 
    ProcessorPolicy& addProcessorPolicy(const string& name, const string& clock_mode, const int& basic_speed, const int& max_speed);
    //ProcessorPolicy이름으로 조회
    ProcessorPolicy& getProcessorPolicy(const string& name);

    ProcessorPolicy& activateProcessorPolicy(const string& name);
    ProcessorPolicy& deactivateProcessorPolicy(const string& name);

    //이름으로 있는지 찾고 삭제 
    ProcessorPolicy& deleteProcessorPolicy(const string& name);
    //프로세서 정보 출력
    void displayAll()const;
    void displayActivate()const;
    void displayDeactivate()const;
    
};
#endif //POLICY_H