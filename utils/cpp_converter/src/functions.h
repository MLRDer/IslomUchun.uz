#include <napi.h>
#include<string>

namespace functions {

    // lotin to kiril function definition
    std::u16string ltok(std::u16string s);
    Napi::String ltokWrapped(const Napi::CallbackInfo& info);

    // kiril to lotin function definition
    std::u16string ktol(std::u16string s);
    Napi::String ktolWrapped(const Napi::CallbackInfo& info);

    // detector function definition
    std::string detect(std::u16string s);
    Napi::String detectWrapped(const Napi::CallbackInfo& info);

    Napi::Object Init(Napi::Env env, Napi::Object exports);
    
}