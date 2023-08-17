#ifndef __DEMO_ECHO_SERVER_H
#define __DEMO_ECHO_SERVER_H

#include <dbus-c++-1/dbus-c++/dbus.h>
#include <fcntl.h>
#include <linux/i2c-dev.h>
#include <linux/i2c.h>
#include <stdint.h>
#include <sys/ioctl.h>
#include <sys/ipc.h>
#include <sys/msg.h>

#include <string>

#include "../KETI-IBMC-hj/ibmc_proxy.h"
#include "../Feedback/feedback_proxy.h"
#include "../Policy/policy_proxy.h"
#include "../Energy/energy_proxy.h"
#include "../Monitor/monitor_proxy.h"
#include "../server_path"

#include "ssp_adaptor.h"
class Ssp_Adaptor : public org::freedesktop::keti::bmc::ssp_adaptor,
                       public DBus::IntrospectableAdaptor,
                       public DBus::ObjectAdaptor

{
 public:
  Ssp_Adaptor(DBus::Connection &connection);
  int32_t ssp_ibmc();
  int32_t ssp_feedback();
  int32_t ssp_policy();
  int32_t ssp_energy();
  int32_t ssp_monitor();
};
class Ibmc_Proxy : public org::freedesktop::keti::bmc::ibmc_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Ibmc_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Ibmc_Proxy(){};
};
class Feedback_Proxy : public org::freedesktop::keti::bmc::feedback_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Feedback_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Feedback_Proxy(){};
};
class Policy_Proxy : public org::freedesktop::keti::bmc::policy_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Policy_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Policy_Proxy(){};
};
class Energy_Proxy : public org::freedesktop::keti::bmc::energy_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Energy_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Energy_Proxy(){};
};
class Monitor_Proxy : public org::freedesktop::keti::bmc::monitor_proxy,
                   public DBus::IntrospectableProxy,
                   public DBus::ObjectProxy {
 public:
  Monitor_Proxy(DBus::Connection &connection, const char *path,
                   const char *name);
  ~Monitor_Proxy(){};
};
void connect_to_ibmc_server();
void connect_to_feedback_server();
void connect_to_policy_server();
void connect_to_energy_server();
void connect_to_monitor_server();
#endif  //__DEMO_ECHO_SERVER_H