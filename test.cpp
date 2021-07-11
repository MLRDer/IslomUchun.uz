#include<iostream>
#include<algorithm>

using namespace std;

char lotin[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'};
char kiril[] = {'а', 'б', 'с', 'д', 'е', 'ф', 'г', 'ҳ', 'и', 'ж', 'к', 'л', 'м', 'н', 'о', 'п', 'қ', 'р', 'с', 'т', 'у', 'в', 'х', 'й', 'з'};

char Clotin[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'};
char Ckiril[] = {'А', 'Б', 'С', 'Д', 'E', 'Ф', 'Г', 'Ҳ', 'И', 'Ж', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Қ', 'Р', 'С', 'Т', 'У', 'В', 'Х', 'Й', 'З'};

char checkL[] = {'b', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'q', 'r', 's', 't', 'v', 'z', 'D', 'G', 'I', 'J', 'L', 'N', 'Q', 'R', 'S', 'U', 'V', 'Y', 'Z'}; //30
char checkK[] = {'б', 'д', 'ф', 'г', 'ҳ', 'и', 'ж', 'к', 'л', 'м', 'н', 'п', 'қ', 'т', 'в', 'й', 'з', 'Б', 'Д', 'Ф', 'Г', 'Ҳ', 'И', 'Ж', 'Л', 'П', 'Қ', 'У', 'Й', 'З'}; //30

string lotinEx[] = {"sh", "ch", "ya", "yu", "yo", "o'", "oʼ", "g'", "gʼ", " ye", " e", "'", "ʼ"};
string kirilEx[] = {"ш", "ч", "я", "ю", "ё", "ў", "ў", "ғ", "ғ", " е", " э", "ъ", "ъ"};

string ClotinEx[] = {"Sh", "Ch", "Ya", "Yu", "Yo", "O'", "Oʼ", "G'", "Gʼ", " Ye", " E"};
string CkirilEx[] = {"Ш", "Ч", "Я", "Ю", "Ё", "Ў", "Ў", "Ғ", "Ғ", " Е", " Э"};


/*
 *      Function to replace all occurrences substring with another.
 *      Only for internal usage purpose!
 */
void replaceAll(string base, string from, string to) {
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
string ltok(string s)
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
string ktol(string s)
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
string detect(string s)
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

// ------------test-------------
int main()
{
	setlocale(LC_ALL, "Russian");
    string s = "вливар";
    cout << ktol(s) << '\n';
    cout << ltok(s);
    return 0;
}