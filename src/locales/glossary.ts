export type GlossaryTerms = Record<keyof GlossaryKeys, string>;

export interface GlossaryKeys {
	ADDRESSING_SCHEME: "ADDRESSING_SCHEME";
	ASSEMBLY_LANGUAGE: "ASSEMBLY_LANGUAGE";
	BIT: "BIT";
	COMPILER: "COMPILER";
	DRUM_MEMORY: "DRUM_MEMORY";
	FORTRAN: "FORTRAN";
	FRIDEN_FLEXOWRITER: "FRIDEN_FLEXOWRITER";
	GOTO: "GOTO";
	HEXADECIMAL: "HEXADECIMAL";
	INFINITE_LOOP: "INFINITE_LOOP";
	JUMP_INSTRUCTION: "JUMP_INSTRUCTION";
	LGP_30: "LGP-30";
	LOOP: "LOOP";
	MACHINE_CODE: "MACHINE_CODE";
	MAGNETIC_CORE_MEMORY: "MAGNETIC_CORE_MEMORY";
	OPERAND: "OPERAND";
	OPERATION_CODE: "OPERATION_CODE";
	OPTIMAL_CODE: "OPTIMAL_CODE";
	OPTIMUM: "OPTIMUM";
	PASCAL: "PASCAL";
	PESSIMUM: "PESSIMUM";
	PORT: "PORT";
	RATFOR: "RATFOR";
	REAL_PROGRAMMER: "REAL_PROGRAMMER";
	REGISTER: "REGISTER";
	RPC_4000: "RPC-4000";
	TERMINATING_CONDITION: "TERMINATING_CONDITION";
	TIME_DELAY_LOOP: "TIME_DELAY_LOOP";
	TOP_DOWN_DESIGN: "TOP_DOWN_DESIGN";
	VACUUM_TUBE: "VACUUM_TUBE";
}

export const GLOSSARY_TERMS_EN: GlossaryTerms = {
	ADDRESSING_SCHEME: "Addressing Scheme",
	ASSEMBLY_LANGUAGE: "Assembly Language",
	BIT: "Bit",
	COMPILER: "Compiler",
	DRUM_MEMORY: "Drum Memory",
	FORTRAN: "Fortran",
	FRIDEN_FLEXOWRITER: "Friden Flexowriter",
	GOTO: "GOTO",
	HEXADECIMAL: "Hexadecimal",
	INFINITE_LOOP: "Infinite Loop",
	JUMP_INSTRUCTION: "Jump Instruction",
	LGP_30: "LGP 30",
	LOOP: "Loop",
	MACHINE_CODE: "Machine Code",
	MAGNETIC_CORE_MEMORY: "Magnetic Core Memory",
	OPERAND: "Operand",
	OPERATION_CODE: "Operation Code",
	OPTIMAL_CODE: "Optimal Code",
	OPTIMUM: "Optimum",
	PASCAL: "Pascal",
	PESSIMUM: "Pessimum",
	PORT: "Port",
	RATFOR: "RATFOR",
	REAL_PROGRAMMER: "Real Programmer",
	REGISTER: "Register",
	RPC_4000: "RPC-4000",
	TERMINATING_CONDITION: "Terminating Code",
	TIME_DELAY_LOOP: "Time Delay Loop",
	TOP_DOWN_DESIGN: "Top Down Design",
	VACUUM_TUBE: "Vacuum Tube",
};

export const GLOSSARY_TERMS_HE: GlossaryTerms = {
	ADDRESSING_SCHEME: "מיעון כתובות",
	ASSEMBLY_LANGUAGE: "שְׂפַת סַף",
	BIT: "בִּיט",
	COMPILER: "מְהַדֵּר",
	DRUM_MEMORY: "זִכְרוֹן תֹּף",
	FORTRAN: "פוֹרְטְרַן",
	FRIDEN_FLEXOWRITER: "פרידן פלקסורייטר",
	GOTO: "פְּקֻדָּת GOTO",
	HEXADECIMAL: "בְּסִיס הֶקְסָדֵּצִימָלִי",
	INFINITE_LOOP: "לוּלָאָה אֵינְסוֹפִית",
	JUMP_INSTRUCTION: "הוֹרָאַת דִּלּוּג",
	LGP_30: "LGP-30",
	LOOP: "לוּלָאָה",
	MACHINE_CODE: "שְׂפַת מְכוֹנָה",
	MAGNETIC_CORE_MEMORY: "לִבּוֹת זִכְרוֹן טַבְּעוֹת מַגְנֵטִי",
	OPERAND: "אוֹפֵּרַנְדּ",
	OPERATION_CODE: "קוֹד-פְּעֻלָּה",
	OPTIMAL_CODE: "קוֹד אוֹפְּטִימָלִי",
	OPTIMUM: "אוֹפְּטִימוּם",
	PASCAL: "פַּסְקָל",
	PESSIMUM: "פֵּסִימוּם",
	PORT: "פּוֹרְט",
	RATFOR: "רַאטְפוֹר",
	REAL_PROGRAMMER: "מתכנת/ת אמיתי/ת",
	REGISTER: "אוֹגֵר",
	RPC_4000: "RPC-4000",
	TERMINATING_CONDITION: "תְּנַאי עֲצִירָה",
	TIME_DELAY_LOOP: "לוּלְאַת הַשְׁהָיָה",
	TOP_DOWN_DESIGN: "עיצוב מעלה-מטה",
	VACUUM_TUBE: "שְׁפוֹפֶרֶת רִיק",
};
