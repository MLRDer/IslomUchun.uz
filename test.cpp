#include<algorithm>
#include<iostream>
#include<string>
#include <locale>
#include <codecvt>

using namespace std;

char16_t lotin[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'};
char16_t kiril[] = {'а', 'б', 'с', 'д', 'е', 'ф', 'г', 'ҳ', 'и', 'ж', 'к', 'л', 'м', 'н', 'о', 'п', 'қ', 'р', 'с', 'т', 'у', 'в', 'х', 'й', 'з'};

char16_t Clotin[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'};
char16_t Ckiril[] = {'А', 'Б', 'С', 'Д', 'E', 'Ф', 'Г', 'Ҳ', 'И', 'Ж', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Қ', 'Р', 'С', 'Т', 'У', 'В', 'Х', 'Й', 'З'};

char16_t checkL[] = {'b', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'q', 'r', 's', 't', 'v', 'z', 'D', 'G', 'I', 'J', 'L', 'N', 'Q', 'R', 'S', 'U', 'V', 'Y', 'Z'}; //30
char16_t checkK[] = {'б', 'д', 'ф', 'г', 'ҳ', 'и', 'ж', 'к', 'л', 'м', 'н', 'п', 'қ', 'т', 'в', 'й', 'з', 'Б', 'Д', 'Ф', 'Г', 'Ҳ', 'И', 'Ж', 'Л', 'П', 'Қ', 'У', 'Й', 'З'}; //30

u16string lotinEx[] = {u"sh", u"ch", u"ya", u"yu", u"yo", u"o'", u"oʼ", u"g'", u"gʼ", u" ye", u" e", u"'", u"ʼ"};
u16string kirilEx[] = {u"ш", u"ч", u"я", u"ю", u"ё", u"ў", u"ў", u"ғ", u"ғ", u" е", u" э", u"ъ", u"ъ"};

u16string ClotinEx[] = {u"Sh", u"Ch", u"Ya", u"Yu", u"Yo", u"O'", u"Oʼ", u"G'", u"Gʼ", u" Ye", u" E"};
u16string CkirilEx[] = {u"Ш", u"Ч", u"Я", u"Ю", u"Ё", u"Ў", u"Ў", u"Ғ", u"Ғ", u" Е", u" Э"};


/*
 *      Function to replace all occurrences substring with another.
 *      Only for internal usage purpose!
 */
void replaceAll(u16string base, u16string from, u16string to) {
    while (true)
    {
        size_t start = base.find(from);
        if(start == std::string::npos) {
            break;
        }

        base.replace(start, from.length(), to);
    }
}

/*
 *      Converts Lotin to Kiril
 */
u16string ltok(u16string s)
{
    // exceptions are first. This one is first because it has ' and ʼ
	for(int i = 0; i < 13; i++) {
        replaceAll(s, lotinEx[i], kirilEx[i]);
    }

    // second exception
    for(int i = 0; i < 11; i++) {
        replaceAll(s, ClotinEx[i], CkirilEx[i]);
    }
    
    // Capitals
    for(int i = 0; i < 25; i++) {
        replace(s.begin(), s.end(), Clotin[i], Ckiril[i]);
    }

    // lowercases
    for(int i = 0; i < 25; i++) {
        replace(s.begin(), s.end(), lotin[i], kiril[i]);
    }

    return s;
}

/*
 *      Converts Kiril to Lotin
 */
u16string ktol(u16string s)
{
	// exceptions are first. This one is first because it has ' and ʼ
	for(int i = 0; i < 13; i++) {
        replaceAll(s, kirilEx[i], lotinEx[i]);
    }

    // second exception
    for(int i = 0; i < 11; i++) {
        replaceAll(s, CkirilEx[i], ClotinEx[i]);
    }
    
    // Capitals
    for(int i = 0; i < 25; i++) {
        replace(s.begin(), s.end(), Ckiril[i], Clotin[i]);
    }

    // lowercases
    for(int i = 0; i < 25; i++) {
        replace(s.begin(), s.end(), kiril[i], lotin[i]);
    }

    return s;
}

/*
 *      This function checks unique letters from both alphabets
 *      and decides in which alphabet the input string is.
 *      Returns strings of "lotin", "kiril" and "both" accordingly
 */
string detect(u16string s)
{
    int l = 0, k = 0;
    size_t f;
    // find lotin chars from input string
    for(int i = 0; i < 30; i++) {
        f = s.find(checkL[i]);
        if(f != string::npos) {
            l++;
        }
    }

    // find kiril chars from input string
    for(int i = 0; i < 30; i++) {
        f = s.find(checkK[i]);
        if(f != string::npos) {
            k++;
        }
    }

    // contains only lotin letters
    if(l > 0 && k == 0) {
        return "lotin";
    }

    // contains only kiril letters
    if(k > 0 && l == 0) {
        return "kiril";
    }

    // contains both 
    return "both";
}

int main()
{
    u16string str = ltok(u"djfbdhf");
    std::wstring_convert<std::codecvt_utf8<char16_t>, char16_t> converter;
    std::cout << converter.to_bytes(str) << std::endl;
}