#include <napi.h>

namespace functions {

    // lotin to kiril function definition
    std::string ltok(std::string s);
    Napi::String ltokWrapped(const Napi::CallbackInfo& info);

    // kiril to lotin function definition
    std::string ktol(std::string s);
    Napi::String ktolWrapped(const Napi::CallbackInfo& info);

    // detector function definition
    std::string detect(std::string s);
    Napi::String detectWrapped(const Napi::CallbackInfo& info);

    Napi::Object Init(Napi::Env env, Napi::Object exports);
    
}