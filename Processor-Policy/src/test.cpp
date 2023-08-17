// #include "ProcessorPolicy.hpp"

// ProcessorPolicy::ProcessorPolicy(){}
// //하나의 프로세서를 나타내는 클래스
// ProcessorPolicy::ProcessorPolicy(const string name, const int max_speed, const string clock_mode) : mname(name), mmax_speed(max_speed), mclock_mode(clock_mode){}

// void ProcessorPolicy::set_name(const string& name ){
//     mname = name;
// }
// const string& ProcessorPolicy::get_name() const{
// //해당 멤버 함수가 객체의 상태를 변경하지 않음, 객체 복사를 하지 않음, 이렇게 함으로써 객체의 상태를 변경하지 않고 멤버 변수의 값을 읽을수 있음
//     return mname;
// }

// void ProcessorPolicy::set_max_speed(const int& max_speed){
//     mmax_speed = max_speed;
// }
// const int& ProcessorPolicy::get_max_speed() const{
//     return mmax_speed;
// }

// void ProcessorPolicy::set_clock_mode(const string& clock_mode){
//     mclock_mode = clock_mode;
// }

// const string& ProcessorPolicy::get_clock_mode() const{
//     return mclock_mode;
// }

// void ProcessorPolicy::m_deactivate(){
//     mactivate = false;
// }
// void ProcessorPolicy::m_activate(){
//     mactivate = true;
// }
// const bool& ProcessorPolicy::mis_activate() const{
//     return mactivate;
// }
// void ProcessorPolicy::display() const{
//     cout << "Name : " << get_name() << endl; 
//     cout << "max_speed : " << get_max_speed() << endl; 
//     cout << "clock mode : " << get_clock_mode()  << endl;  
//     cout << "activate : " << mis_activate() << endl;       
// }    


// namespace Records{
//     const int kDefaultStartingSalary = 3000;
//     class Employee{
//         public:
//         Employee() = default;
//         Employee(const string& firstName, const string& lastName);
//         void promote(int raiseAmount = 1000);
//         void demote(int demeritAmount = 1000);
//         void hire();
//         void fire();
//         void display() const;
//         void setFirstName(const string& firstName);
//         const string& getFirstName() const;
//         void setLastName(const string& lastName);
//         const string& getLastName() const;
//         void setEmployeeNumber(int employeeNumber);
//         int getEmployeeNumber() const;
//         void setSalary(int newSalary);
//         int getSalary()const;
//         bool isHired() const;
//         private:
//         string mFirstName;
//         string mLastName;
//         int mEmployeeNumber = -1;
//         int mSalary = kDefaultStartingSalary;
//         bool mHired = false;
//     };
// }

// namespace Records{
//     Employee::Employee(const string& firstName, const string& lastName) : mFirstName(firstName), mLastName(lastName){}
//     void Employee::promote(int raiseAmount){
//         setSalary(getSalary() + raiseAmount);
//     }
//     void Employee::demote(int demeritAccount){
//         setSalary(getSalary() - demeritAccount);
//     }
//     void Employee::hire(){
//         mHired = true;
//     }
//     void Employee::fire(){
//         mHired = false;
//     }
//     void Employee::display() const{
//         cout << "Employee" << getLastName() << ", " << getFirstName() << endl;
//         cout << "-------------------" << endl;
//         cout <<(isHired()? "Current Employee" : "Former Employee" ) << endl;
//         cout << "Employee Number: " << getEmployeeNumber() << endl;
//         cout << "Salary: $" << getSalary() << endl;
//         cout << endl;
//     }
//     void Employee::setFirstName(const string& firstName){
//         mFirstName = firstName;
//     }
//     const string& Employee::getFirstName() const{
//         return mFirstName;
//     }
//     void Employee::setLastName(const string& lastName){
//         mLastName = true;
//     }
//     const string& Employee::getLastName() const{
//         return mLastName;
//     }
//     void Employee::setEmployeeNumber(int employeeNumber){
//         mEmployeeNumber = employeeNumber;
//     }
//     int Employee::getEmployeeNumber() const{
//         return mEmployeeNumber;
//     }
//     void Employee::setSalary(int salary){
//         mSalary = salary;
//     }
//     int Employee::getSalary() const{
//         return mSalary;
//     }
//     bool Employee::isHired() const{
//         return mHired;
//     }
// }

// namespace Records{
//     const int kFirstEmployeeNumber = 1000;
//     class Database{
//         public:
//         Employee& addEmployee(const string& firstName, const string& lastName);
//         Employee& getEmployee(int employeeNubmer);
//         Employee& getEmployee(const string& firstName, const string& lastName);
//         void displayAll() const;
//         void displayCurrent() const;
//         void displayFormer() const;
//         private:
//         vector<Employee> mEmployees;
//         int mNextEmployeeNumber = kFirstEmployeeNumber;
//     };
// }

// namespace Records{
//     Employee& Database::addEmployee(const string& firstName, const string& lastName){
//         Employee theEmployee(firstName, lastName);
//         theEmployee.setEmployeeNumber(mNextEmployeeNumber++);
//         theEmployee.hire();
//         mEmployees.push_back(theEmployee);
//         return mEmployees[mEmployees.size() -1];
//     }
//     Employee& Database::getEmployee(int employNumber){
//         for(auto& employee : mEmployees){
//             if(employee.getEmployeeNumber() == employNumber){
//                 return employee;
//             }
//         }
//         throw logic_error("No employee found");
//     }
//     Employee& Database::getEmployee(const string& firstName, const string& lastName){
//         for(auto& employee : mEmployees){
//             if(employee.getFirstName() == firstName &&
//             employee.getLastName() == lastName){
//                 return employee;
//             }
//         }
//         throw logic_error("No employee found");
//     }
//     void Database::displayAll() const{
//         for(const auto& employee : mEmployees){
//             employee.display();
//         }
//     }
//     void Database::displayCurrent() const{
//         for(const auto& employee: mEmployees){
//             if(employee.isHired())
//                 employee.display();
//         }
//     }
//     void Database::displayFormer()const{
//         for(const auto& employee : mEmployees){
//             if(!employee.isHired())
//                 employee.display();
//         }
//     }
// }
// int main(){
//     Records::Database myDB;
//     Records::Employee& emp1 = myDB.addEmployee("Greg", "Wallis");
//     emp1.fire();
//     Records::Employee& emp2 = myDB.addEmployee("Marc", "white");
//     emp2.setSalary(1000);
//     Records::Employee& emp3 = myDB.addEmployee("John","Doe");
//     emp3.setSalary(10000);
//     emp3.promote();
//     cout << "all employees" << endl;
//     myDB.displayAll();
//     cout << "Former" << endl;
//     myDB.displayFormer();
//     cout << "Current" << endl;
//     myDB.displayCurrent();
//     // Records::Employee emp;
//     // emp.setFirstName("John");
//     // emp.setLastName("Doe");
//     // emp.setEmployeeNumber(71);
//     // emp.setSalary(5000);
//     // emp.promote();
//     // emp.promote(50);
//     // emp.hire();
//     // emp.display(); 
//     return 0;
// }
// class A{
//     public:
//     A(int x){
//         cout << "A" << endl;
//         if(x > 100)
//             x= 100;
//         m_x =100;
//     }
//     A(int x, int y) : A(x){
//             cout << "A(int int)"<< endl;
//             if(y>200)
//                 y =200;
//             m_y =200;
//             }
//     void print(){
//         cout << m_x << endl;
//         cout << m_y << endl;
//     }
//     private:
//     int m_x = 0;
//     int m_y = 0;
// }; //다른 생성자를 추가로 부르는 생성자 초기화
// int main()
// {
//     A ptBegin(10);
//     ptBegin.print();
//     A ptEnd(30,100);
//     ptEnd.print();
// }
// class ref{
//     public:
//     ref(int &rParam) : m_nData(rParam){}; //참조형 멤버는 반드시 생성자 초기화 목록을 이용해 초기화 
//     int getdata(){return m_nData;}
//     private:
//     int &m_nData;
// };
// int main(){
//     int a = 10;
//     ref t(a);
//     cout << t.getdata()<< endl;
//     a=20;
//     cout <<t.getdata();
// }
// class Ctest{
//     public:
//     Ctest(){
//         cout << "생성자" << endl;
//         mdata=10;
//     }
//     int mdata;
//     void print(){
//         cout << mdata <<endl;
//     }
// };
// int main(){
//     Ctest t;
//     t.print();
// }
// class USERDATA{
// public:
//     int nAge;
//     char szname[32];
// void print(){
//     printf("%d, %s\n", nAge, szname);   //nAge와 szname은 print의 지역 변수가 아님, print함수가 속산 클래스의 멤버 변수임
// } 
// };
//기존 절차지향 프로그래밍 코드
//제작자 기준 
// typedef struct USERDATA{
//     int nAge;
//     char szName[32];
//     void(*Print)(struct USERDATA *);
// }USERDATA;
// void PrintData(USERDATA *pUser){
//     printf("%d, %s\n", pUser->nAge, pUser->szName);
// }
// //사용자 코드 
// int main(){
//     USERDATA user = {20, "철수"};
//     //printf("%d, %s\n", user.nAge, user.szName);
//     //PrindData(&user);
//     user.print();
//     return 0;
// }
//namespace 다중 정의
// void TestFunc(void){
//     cout << "전역 TestFunc" << endl;
// }
// namespace MYDATA{
//     void TestFunc(void){
//         cout << "DATA::TestFunc" << endl;
//     }
// }
// int main(){
//     TestFunc();//묵시적 전역
//     ::TestFunc();//명시적 전역
//     MYDATA::TestFunc();
// }
// namespace test{
//     int g_ndata = 100;
//     void testFunc(){
//         cout << "testFunc" << endl;
//     }
// }
// using namespace test;
// int main(){
//     testFunc();
//     cout << g_ndata;
// }
//인라인 함수 
// #define ADD(a,b)((a)+(b))
// int Add(int a, int b){
//     return a+b;
// }
// inline int AddNew(int a, int b){
//     return a+b;
// }
// int main(){
//     int a, b;
// }
// template <typename T>
// T Add(T a, T b){
//     return a+b;
// }
// int main(){
//     cout << Add(3, 4) << endl;
//     cout << Add(3.5,3.5) << endl;
// }
//다중 정의 template함수
// template <typename T>
// T TestFunction(T a){
//     cout << "매개변수 a: " << a << endl;
//     return a;
// }
// int main(){
//     cout << "int\t" << TestFunction(3) << endl;
//     cout << "double\t" << TestFunction(3.3) << endl;
//     cout << "char\t" << TestFunction('A') << endl;
//     cout << "char*\t" << TestFunction("TestString") << endl;
// }
// int CalcLayout(int nWidth, int nHeight, int nType = MYTYPE_A){
//     return nHeight*nWidth + nType;
// }
// CalcLayout(10,5,MYTYPE_A);
//매개변수 2개 인 경우
// int TestFunc(int nPram1, int nPram2 = 2){   // 무조건 오른쪽 부터 기술, 왼쪽에 디폴트 주려면 다 채워야 한다는 소리임 
//     return nPram1*nPram2;
// }
// int main(){
//     cout << TestFunc(10);
//     cout << TestFunc(10, 5);
// }
// int testFunc(int = 10); 호출자만 보고 함수 원형을 확장하면 한됨
// int testFunc(int nPram){
//     return nPram;
// }
// int main(){
//     cout << testFunc(20);
// }
// int testFunc(int nPram = 10){ // 디폴트 값을 선언한 함수는 호출자 코드에서 실인수를 생략한 채 호출 가능; 
//     return nPram; 
// }
// int main(){
//     cout << testFunc() <<endl;
//     cout << testFunc(20) << endl;
// }
//1-1 - 자신의 이름과 나이를 입력받고, "나의 이름은 홍길동이고, 20살입니다. 출력"
// int main(){
//     string name = "";
//     int age = 0; 
//     cout << "이름";
//     cin >> name;
//     cout << "나이" ;
//     cin >> age;
//     cout << "나의 이름은 " << name << " 이고, " << age << "입니다." ;
// }
//1-2 - auto 예약어는 어떤 의미인가 초깃값 형식에 맞춰 선언하는 인스턴스 형식이 '자동'으로 결정
//1-3 - char[12] 배열 메모리를 new 연산자로 할당하고 해제하는 코드
// int main(){
//     char *a = new char[12]; 
//     //얘는 auto가 안되네 for(auto i : a){ 
//     //     a[i] = 1;
//     // }
//     for (int i = 0; i<12 ;i++){
//         a[i] = 'h' ;
//     }
//     for(int i = 0; i< 12; i++){
//         cout << a[i] ;
//     }
//     delete[] a;
// }
//1-4 - void Swap(int &a, int &b)작성 
// void swap(int &a, int &b){
//     int temp = a;
//     a=b;
//     b=temp;
// }
// int main(){
//     int a = 3;
//     int b = 5;
//     cout << "a = " << a << "b = "<< b << endl;
//     swap(a,b);
//     cout << "a = " << a << "b = "<< b << endl;
// }
//1-5 - 상수형 참조가 기존의 참조형식과 크게 다른 점 상수에는 참조자를 선언할 수 없다
//1-6 - int aList[5] = {30, 40, 50, 10, 20} 을 오름차순으로 정렬 범위 기반 for
// int main(){
//     int arr[5] = {30,40,50,10,20};
//     int min = 100;
//     for (int i = 0; i < 4; ++i) {
//         int minIndex = i;
//         for (int j = i + 1; j < 5; ++j) {
//             if (arr[j] < arr[minIndex]) {
//                 minIndex = j;
//             }
//         }
//         if (minIndex != i) {
//             // Swap arr[i] and arr[minIndex]
//             int temp = arr[i];
//             arr[i] = arr[minIndex];
//             arr[minIndex] = temp;
//         }
//     }
//     for(auto n: arr){
//         cout << n << " " << endl;
//     }
// }
// int main(){
//     int arrList[5] = {10,20,30,40,50};
//     cout << "n :" << endl;
//     for(auto n : arrList){
//         cout << n << " " ;
//     }
//     cout << "&n :" << endl; //값을 각각 넣으려면 참조자를 요소 형식으로 선언
//     for(auto &n: arrList){
//         cout << n << " " ;
//     }
// }
// int testFunc(int npram){
//     int nResult = npram*2;
//     return nResult;
// }
// int main(){
//     int ninput = 0;
//     cin >> ninput;
//     int &&rdata = ninput + 5;
//     cout << rdata << endl;
//     int &&result = testFunc(10);
//     result +=10;
//     cout << result ;
// }   //r-value 임시 결과 
// void Swap(int &a, int &b){
//     int nTmp = a;
//     a=b;
//     b=nTmp;
// }
// int main(){
//     int x = 10, y=20;
//     Swap(x, y);
//     cout << x << y <<endl;
// }
// int main(){
//     int *pData = new int; //int 인스턴스 한 개가 동적으로 생성 
//     int *pNewData = new int(10); //int 인스턴스 한개가 동적으로 생성
//     *pData = 5;
//     std::cout << *pData << std::endl;
//     std::cout << *pNewData << std::endl;
//     delete pData;
//     delete pNewData;
// }
// int main(){
//     int *arr = new int[5];  //객체를 배열 형태로 동적 생성 new는 객체 생성자 호출, delete연산자는 객체 소멸자 호출
//     for(int i = 0; i<5; i++){
//         arr[i] = (i+1) * 10;
//     }
//     for(int i = 0; i<5; i++){
//         cout << arr[i] <<endl;
//     }
//     delete[] arr;
// }
// int main(){
//     int nData = 10;
//     //nData 변수에 대한 참조자 선언
//     int &ref = nData;
//     ref = 20;
//     cout << nData << endl;
//     int *pData = &nData;
//     *pData = 30;
//     cout << nData << endl;
// }
// void TestFunc(int &rPram){
//     rPram = 100;
// }
// int main(){
//     int nData = 0;
//     TestFunc(nData);
//     cout << nData << endl;
// }