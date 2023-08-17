#include <iostream>
#include <regex>
using namespace std;
//추상 클래스 
class Policy{
//필요한 것 
//CRUD함수 (Create매개변수 필요, Read, Update매개변수 필요, Delete, 매개변수 필요 )
private:
bool mactivate = false;
public: 
Policy(){};
Policy(const Policy&) = default;
//virtual을 사용하여 재정의 
void m_deactivate(){
    mactivate = false;
}
void m_activate(){
    mactivate = true;
}
const bool& mis_activate()const{
    return mactivate;
}
virtual void policy_display() const{
    cout << "Policy All Read..." << endl;
}

virtual ~Policy() {}
};
