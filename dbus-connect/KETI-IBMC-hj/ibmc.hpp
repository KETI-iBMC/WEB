#include <dbus-c++-1/dbus-c++/dbus.h>
#include <fcntl.h>
#include <linux/i2c-dev.h>
#include <linux/i2c.h>
#include <stdint.h>
#include <sys/ioctl.h>
#include <sys/ipc.h>
#include <sys/msg.h>

#include <string>
#include "../server_path"
#include "ibmc_adaptor.h"
#include "../Policy/policy_proxy.h"
#include "../Feedback/feedback_proxy.h"
#include "../Monitor/monitor_proxy.h"
#include "../Energy/energy_proxy.h"
#include "../SSP/ssp_proxy.h"


class Ibmc_Adaptor : public org::freedesktop::keti::bmc::ibmc_adaptor,
                     public DBus::IntrospectableAdaptor,
                     public DBus::ObjectAdaptor

{
 public:
  Ibmc_Adaptor(DBus::Connection& connection);

 public:
  int32_t ibmc_policy();
  int32_t ibmc_feedback();
  int32_t ibmc_monitor();
  int32_t ibmc_energy();
  int32_t ibmc_ssp();
};

class Policy_Proxy : public org::freedesktop::keti::bmc::policy_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Policy_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Policy_Proxy(){};
};
class Feedback_Proxy : public org::freedesktop::keti::bmc::feedback_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Feedback_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Feedback_Proxy(){};
};
class Monitor_Proxy : public org::freedesktop::keti::bmc::monitor_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Monitor_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Monitor_Proxy(){};
};
class Energy_Proxy : public org::freedesktop::keti::bmc::energy_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Energy_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Energy_Proxy(){};
};
class Ssp_Proxy : public org::freedesktop::keti::bmc::ssp_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Ssp_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Ssp_Proxy(){};
};
void connect_to_policy_server();
void connect_to_feedback_server();
void connect_to_monitor_server();
void connect_to_energy_server();
void connect_to_ssp_server();

void run_ibmc_server();
