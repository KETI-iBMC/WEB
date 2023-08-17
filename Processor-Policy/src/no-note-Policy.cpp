#include <iostream>
#include <regex>
using namespace std;
class Policy{
private:
bool mactivate = false;
public: 
Policy(){};
Policy(const Policy&) = default;
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
