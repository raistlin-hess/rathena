// Copyright (c) rAthena Dev Teams - Licensed under GNU GPL
// For more information, see LICENCE in the main folder

/**
 * Custom Script Commands
 * Place the body of custom script commands in this file.
 * Format:
 *	BUILDIN_FUNC(command_name)
 *	{
 *		<code>;
 *	}
 **/

//Gives all  skills
// BUILDIN_FUNC(fake) {
//    static const char skillScript[] = "{ \
//        skill \"name_here\", lvl_here; \
//    }";
//     return callScript(st, skillScript);
// }

int callScript(struct script_state* st, const char* skillScript) {
    struct script_code *script = parse_script(skillScript, "skill", 0, 0);
    int charId = st->rid;   //sd->status.char_id;
    int objectId = st->oid;
    run_script(script, 0, st->rid, st->oid);
}

//Gives all Mage skills
BUILDIN_FUNC(fakemage) {
    static const char skillScript[] = "{ \
        skill \"MG_SRECOVERY\", 10; \
        skill \"MG_SRECOVERY\", 10; \
        skill \"MG_SIGHT\", 1; \
        skill \"MG_NAPALMBEAT\", 10; \
        skill \"MG_SAFETYWALL\", 10; \
        skill \"MG_SOULSTRIKE\", 30; \
        skill \"MG_COLDBOLT\", 10; \
        skill \"MG_FROSTDIVER\", 10; \
        skill \"MG_STONECURSE\", 10; \
        skill \"MG_FIREBALL\", 10; \
        skill \"MG_FIREWALL\", 10; \
        skill \"MG_FIREBOLT\", 10; \
        skill \"MG_LIGHTNINGBOLT\", 10; \
        skill \"MG_THUNDERSTORM\", 10; \
    }";

    return callScript(st, skillScript);
}

//Gives all Acolyte skills
BUILDIN_FUNC(fakeacolyte) {
    static const char skillScript[] = "{ \
        skill \"AL_DP\", 10; \
        skill \"AL_DEMONBANE\", 10; \
        skill \"AL_RUWACH\", 1; \
        skill \"AL_PNEUMA\", 1; \
        skill \"AL_TELEPORT\", 2; \
        skill \"AL_WARP\", 4; \
        skill \"AL_HEAL\", 10; \
        skill \"AL_INCAGI\", 10; \
        skill \"AL_DECAGI\", 10; \
        skill \"AL_HOLYWATER\", 1; \
        skill \"AL_CRUCIS\", 10; \
        skill \"AL_ANGELUS\", 10; \
        skill \"AL_BLESSING\", 10; \
        skill \"AL_CURE\", 1; \
    }";
    
    return callScript(st, skillScript);
}

 //Gives all Knight skills
BUILDIN_FUNC(fakeknight) {
    static const char skillScript[] = "{ \
        skill \"KN_SPEARMASTERY\", 10; \
        skill \"KN_PIERCE\", 10; \
        skill \"KN_BRANDISHSPEAR\", 10; \
        skill \"KN_SPEARSTAB\", 10; \
        skill \"KN_SPEARBOOMERANG\", 5; \
        skill \"KN_TWOHANDQUICKEN\", 10; \
        skill \"KN_AUTOCOUNTER\", 5; \
        skill \"KN_BOWLINGBASH\", 10; \
        skill \"KN_RIDING\", 1; \
        skill \"KN_CAVALIERMASTERY\", 5; \
    }";
    
    return callScript(st, skillScript);
}

 //Gives all Priest skills
BUILDIN_FUNC(fakepriest) {
    static const char skillScript[] = "{ \
        skill \"PR_MACEMASTERY\", 10; \
        skill \"PR_IMPOSITIO\", 5; \
        skill \"PR_SUFFRAGIUM\", 3; \
        skill \"PR_ASPERSIO\", 5; \
        skill \"PR_BENEDICTIO\", 5; \
        skill \"PR_SANCTUARY\", 10; \
        skill \"PR_SLOWPOISON\", 4; \
        skill \"PR_STRECOVERY\", 1; \
        skill \"PR_KYRIE\", 10; \
        skill \"PR_MAGNIFICAT\", 5; \
        skill \"PR_GLORIA\", 5; \
        skill \"PR_LEXDIVINA\", 10; \
        skill \"PR_TURNUNDEAD\", 10; \
        skill \"PR_LEXAETERNA\", 1; \
        skill \"PR_MAGNUS\", 10; \
    }";
    
    return callScript(st, skillScript);
}

 //Gives all Wizard skills
BUILDIN_FUNC(fakewizard) {
    static const char skillScript[] = "{ \
        skill \"WZ_FIREPILLAR\", 10; \
        skill \"WZ_SIGHTRASHER\", 10; \
        skill \"WZ_METEOR\", 10; \
        skill \"WZ_JUPITEL\", 10; \
        skill \"WZ_VERMILION\", 10; \
        skill \"WZ_WATERBALL\", 5; \
        skill \"WZ_ICEWALL\", 10; \
        skill \"WZ_FROSTNOVA\", 10; \
        skill \"WZ_STORMGUST\", 10; \
        skill \"WZ_EARTHSPIKE\", 5; \
        skill \"WZ_HEAVENDRIVE\", 5; \
        skill \"WZ_QUAGMIRE\", 5; \
        skill \"WZ_ESTIMATION\", 1; \
    }";
    
    return callScript(st, skillScript);
}

 //Gives all Hunter skills
BUILDIN_FUNC(fakehunter) {
    static const char skillScript[] = "{ \
        skill \"HT_SKIDTRAP\", 5; \
        skill \"HT_LANDMINE\", 5; \
        skill \"HT_ANKLESNARE\", 5; \
        skill \"HT_SHOCKWAVE\", 5; \
        skill \"HT_SANDMAN\", 5; \
        skill \"HT_FLASHER\", 5; \
        skill \"HT_FREEZINGTRAP\", 5; \
        skill \"HT_BLASTMINE\", 5; \
        skill \"HT_CLAYMORETRAP\", 5; \
        skill \"HT_REMOVETRAP\", 1; \
        skill \"HT_TALKIEBOX\", 1; \
        skill \"HT_BEASTBANE\", 10; \
        skill \"HT_FALCON\", 1; \
        skill \"HT_STEELCROW\", 10; \
        skill \"HT_BLITZBEAT\", 5; \
        skill \"HT_DETECTING\", 4; \
        skill \"HT_SPRINGTRAP\", 5; \
    }";
    
    return callScript(st, skillScript);
}

 //Gives all NPC skills
BUILDIN_FUNC(fakenpc) {
    static const char skillScript[] = "{ \
        skill \"ITM_TOMAHAWK\", 1; \
        skill \"NPC_EARTHQUAKE\", 10; \
        skill \"NPC_DRAGONFEAR\", 5; \
        skill \"NPC_PULSESTRIKE\", 5; \
        skill \"NPC_HELLJUDGEMENT\", 10; \
        skill \"NPC_WIDESILENCE\", 5; \
        skill \"NPC_WIDEFREEZE\", 5; \
        skill \"NPC_WIDEBLEEDING\", 5; \
        skill \"NPC_WIDESTONE\", 5; \
        skill \"NPC_WIDECONFUSE\", 5; \
        skill \"NPC_WIDESLEEP\", 5; \
        skill \"NPC_WIDESIGHT\", 1; \
        skill \"NPC_EVILLAND\", 10; \
        skill \"NPC_MAGICMIRROR\", 5; \
        skill \"NPC_SLOWCAST\", 5; \
        skill \"NPC_CRITICALWOUND\", 5; \
        skill \"NPC_STONESKIN\", 5; \
        skill \"NPC_ANTIMAGIC\", 5; \
        skill \"NPC_WIDECURSE\", 5; \
        skill \"NPC_WIDESTUN\", 5; \
        skill \"NPC_VAMPIRE_GIFT\", 10; \
        skill \"NPC_WIDESOULDRAIN\", 10; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Rogue skills
BUILDIN_FUNC(fakerogue) {
    static const char skillScript[] = "{ \
        skill \"RG_SNATCHER\", 10; \
        skill \"RG_STEALCOIN\", 10; \
        skill \"RG_BACKSTAP\", 10; \
        skill \"RG_TUNNELDRIVE\", 5; \
        skill \"RG_RAID\", 5; \
        skill \"RG_STRIPWEAPON\", 5; \
        skill \"RG_STRIPSHIELD\", 5; \
        skill \"RG_STRIPARMOR\", 5; \
        skill \"RG_STRIPHELM\", 5; \
        skill \"RG_INTIMIDATE\", 5; \
        skill \"RG_GRAFFITI\", 1; \
        skill \"RG_FLAGGRAFFITI\", 5; \
        skill \"RG_CLEANER\", 1; \
        skill \"RG_GANGSTER\", 1; \
        skill \"RG_COMPULSION\", 5; \
        skill \"RG_PLAGIARISM\", 10; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Alchemist skills
BUILDIN_FUNC(fakealchemist) {
    static const char skillScript[] = "{ \
        skill \"AM_AXEMASTERY\", 10; \
        skill \"AM_LEARNINGPOTION\", 10; \
        skill \"AM_PHARMACY\", 10; \
        skill \"AM_DEMONSTRATION\", 5; \
        skill \"AM_ACIDTERROR\", 5; \
        skill \"AM_POTIONPITCHER\", 5; \
        skill \"AM_CANNIBALIZE\", 5; \
        skill \"AM_SPHEREMINE\", 5; \
        skill \"AM_CP_WEAPON\", 5; \
        skill \"AM_CP_SHIELD\", 5; \
        skill \"AM_CP_ARMOR\", 5; \
        skill \"AM_CP_HELM\", 5; \
        skill \"AM_BIOETHICS\", 1; \
        skill \"AM_CALLHOMUN\", 1; \
        skill \"AM_REST\", 1; \
        skill \"AM_RESURRECTHOMUN\", 5; \
    }";

	return callScript(st, skillScript);
}

//Gives all Crusader skills
BUILDIN_FUNC(fakecrusader) {
    static const char skillScript[] = "{ \
        skill \"CR_TRUST\", 10; \
        skill \"CR_AUTOGUARD\", 10; \
        skill \"CR_SHIELDCHARGE\", 5; \
        skill \"CR_SHIELDBOOMERANG\", 5; \
        skill \"CR_REFLECTSHIELD\", 10; \
        skill \"CR_HOLYCROSS\", 10; \
        skill \"CR_GRANDCROSS\", 10; \
        skill \"CR_DEVOTION\", 5; \
        skill \"CR_PROVIDENCE\", 5; \
        skill \"CR_DEFENDER\", 5; \
        skill \"CR_SPEARQUICKEN\", 10; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Monk skills
BUILDIN_FUNC(fakemonk) {
    static const char skillScript[] = "{ \
        skill \"MO_IRONHAND\", 10; \
        skill \"MO_SPIRITSRECOVERY\", 5; \
        skill \"MO_CALLSPIRITS\", 5; \
        skill \"MO_ABSORBSPIRITS\", 1; \
        skill \"MO_TRIPLEATTACK\", 10; \
        skill \"MO_BODYRELOCATION\", 1; \
        skill \"MO_DODGE\", 10; \
        skill \"MO_INVESTIGATE\", 5; \
        skill \"MO_FINGEROFFENSIVE\", 5; \
        skill \"MO_STEELBODY\", 5; \
        skill \"MO_BLADESTOP\", 5; \
        skill \"MO_EXPLOSIONSPIRITS\", 5; \
        skill \"MO_EXTREMITYFIST\", 5; \
        skill \"MO_CHAINCOMBO\", 5; \
        skill \"MO_COMBOFINISH\", 5; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Sage skills
BUILDIN_FUNC(fakesage) {
    static const char skillScript[] = "{ \
        skill \"SA_ADVANCEDBOOK\", 10; \
        skill \"SA_CASTCANCEL\", 5; \
        skill \"SA_MAGICROD\", 5; \
        skill \"SA_SPELLBREAKER\", 5; \
        skill \"SA_FREECAST\", 10; \
        skill \"SA_AUTOSPELL\", 10; \
        skill \"SA_FLAMELAUNCHER\", 5; \
        skill \"SA_FROSTWEAPON\", 5; \
        skill \"SA_LIGHTNINGLOADER\", 5; \
        skill \"SA_SEISMICWEAPON\", 5; \
        skill \"SA_DRAGONOLOGY\", 5; \
        skill \"SA_VOLCANO\", 5; \
        skill \"SA_DELUGE\", 5; \
        skill \"SA_VIOLENTGALE\", 5; \
        skill \"SA_LANDPROTECTOR\", 5; \
        skill \"SA_DISPELL\", 5; \
        skill \"SA_ABRACADABRA\", 10; \
        skill \"SA_MONOCELL\", 1; \
        skill \"SA_CLASSCHANGE\", 1; \
        skill \"SA_SUMMONMONSTER\", 1; \
        skill \"SA_REVERSEORCISH\", 1; \
        skill \"SA_DEATH\", 1; \
        skill \"SA_FORTUNE\", 1; \
        skill \"SA_TAMINGMONSTER\", 1; \
        skill \"SA_QUESTION\", 1; \
        skill \"SA_GRAVITY\", 1; \
        skill \"SA_LEVELUP\", 1; \
        skill \"SA_INSTANTDEATH\", 1; \
        skill \"SA_FULLRECOVERY\", 1; \
        skill \"SA_COMA\", 1; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Gunslinger skills
BUILDIN_FUNC(fakegunslinger) {
    static const char skillScript[] = "{ \
        skill \"GS_GLITTERING\", 5; \
        skill \"GS_FLING\", 1; \
        skill \"GS_TRIPLEACTION\", 1; \
        skill \"GS_BULLSEYE\", 1; \
        skill \"GS_MADNESSCANCEL\", 1; \
        skill \"GS_ADJUSTMENT\", 1; \
        skill \"GS_INCREASING\", 1; \
        skill \"GS_MAGICALBULLET\", 1; \
        skill \"GS_CRACKER\", 1; \
        skill \"GS_SINGLEACTION\", 10; \
        skill \"GS_SNAKEEYE\", 10; \
        skill \"GS_CHAINACTION\", 10; \
        skill \"GS_TRACKING\", 10; \
        skill \"GS_DISARM\", 5; \
        skill \"GS_PIERCINGSHOT\", 5; \
        skill \"GS_RAPIDSHOWER\", 10; \
        skill \"GS_DESPERADO\", 10; \
        skill \"GS_GATLINGFEVER\", 10; \
        skill \"GS_DUST\", 10; \
        skill \"GS_FULLBUSTER\", 10; \
        skill \"GS_SPREADATTACK\", 10; \
        skill \"GS_GROUNDDRIFT\", 10; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Ninja skills
BUILDIN_FUNC(fakeninja) {
    static const char skillScript[] = "{ \
        skill \"NJ_TOBIDOUGU\", 10; \
        skill \"NJ_SYURIKEN\", 10; \
        skill \"NJ_KUNAI\", 5; \
        skill \"NJ_HUUMA\", 5; \
        skill \"NJ_ZENYNAGE\", 10; \
        skill \"NJ_TATAMIGAESHI\", 5; \
        skill \"NJ_KASUMIKIRI\", 10; \
        skill \"NJ_SHADOWJUMP\", 5; \
        skill \"NJ_KIRIKAGE\", 5; \
        skill \"NJ_UTSUSEMI\", 5; \
        skill \"NJ_BUNSINJYUTSU\", 10; \
        skill \"NJ_NINPOU\", 10; \
        skill \"NJ_KOUENKA\", 10; \
        skill \"NJ_KAENSIN\", 10; \
        skill \"NJ_BAKUENRYU\", 5; \
        skill \"NJ_HYOUSENSOU\", 10; \
        skill \"NJ_SUITON\", 10; \
        skill \"NJ_HYOUSYOURAKU\", 5; \
        skill \"NJ_HUUJIN\", 10; \
        skill \"NJ_RAIGEKISAI\", 5; \
        skill \"NJ_KAMAITACHI\", 5; \
        skill \"NJ_NEN\", 5; \
        skill \"NJ_ISSEN\", 10; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Rune Knight skills
BUILDIN_FUNC(fakeruneknight) {
    static const char skillScript[] = "{ \
        skill \"RK_ENCHANTBLADE\", 5; \
        skill \"RK_SONICWAVE\", 5; \
        skill \"RK_DEATHBOUND\", 10; \
        skill \"RK_HUNDREDSPEAR\", 10; \
        skill \"RK_WINDCUTTER\", 5; \
        skill \"RK_IGNITIONBREAK\", 5; \
        skill \"RK_DRAGONTRAINING\", 5; \
        skill \"RK_DRAGONBREATH\", 10; \
        skill \"RK_DRAGONHOWLING\", 5; \
        skill \"RK_RUNEMASTERY\", 10; \
        skill \"RK_MILLENNIUMSHIELD\", 1; \
        skill \"RK_CRUSHSTRIKE\", 1; \
        skill \"RK_REFRESH\", 1; \
        skill \"RK_GIANTGROWTH\", 1; \
        skill \"RK_STONEHARDSKIN\", 1; \
        skill \"RK_VITALITYACTIVATION\", 1; \
        skill \"RK_STORMBLAST\", 1; \
        skill \"RK_FIGHTINGSPIRIT\", 1; \
        skill \"RK_ABUNDANCE\", 1; \
        skill \"RK_PHANTOMTHRUST\", 5; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Warlock skills
BUILDIN_FUNC(fakewarlock) {
    static const char skillScript[] = "{ \
        skill \"WL_WHITEIMPRISON\", 5; \
        skill \"WL_SOULEXPANSION\", 5; \
        skill \"WL_FROSTMISTY\", 5; \
        skill \"WL_JACKFROST\", 5; \
        skill \"WL_MARSHOFABYSS\", 5; \
        skill \"WL_RECOGNIZEDSPELL\", 5; \
        skill \"WL_SIENNAEXECRATE\", 5; \
        skill \"WL_RADIUS\", 3; \
        skill \"WL_STASIS\", 5; \
        skill \"WL_DRAINLIFE\", 5; \
        skill \"WL_CRIMSONROCK\", 5; \
        skill \"WL_HELLINFERNO\", 5; \
        skill \"WL_COMET\", 5; \
        skill \"WL_CHAINLIGHTNING\", 5; \
        skill \"WL_CHAINLIGHTNING_ATK\", 5; \
        skill \"WL_EARTHSTRAIN\", 5; \
        skill \"WL_TETRAVORTEX\", 5; \
        skill \"WL_TETRAVORTEX_FIRE\", 5; \
        skill \"WL_TETRAVORTEX_WATER\", 5; \
        skill \"WL_TETRAVORTEX_WIND\", 5; \
        skill \"WL_TETRAVORTEX_GROUND\", 5; \
        skill \"WL_SUMMONFB\", 5; \
        skill \"WL_SUMMONBL\", 5; \
        skill \"WL_SUMMONWB\", 5; \
        skill \"WL_SUMMON_ATK_FIRE\", 5; \
        skill \"WL_SUMMON_ATK_WIND\", 5; \
        skill \"WL_SUMMON_ATK_WATER\", 5; \
        skill \"WL_SUMMON_ATK_GROUND\", 5; \
        skill \"WL_SUMMONSTONE\", 5; \
        skill \"WL_RELEASE\", 2; \
        skill \"WL_READING_SB\", 1; \
        skill \"WL_FREEZE_SP\", 5; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Arch Bishop skills
BUILDIN_FUNC(fakearchbishop) {
    static const char skillScript[] = "{ \
        skill \"AB_JUDEX\", 5; \
        skill \"AB_ANCILLA\", 1; \
        skill \"AB_ADORAMUS\", 10; \
        skill \"AB_CLEMENTIA\", 3; \
        skill \"AB_CANTO\", 3; \
        skill \"AB_CHEAL\", 3; \
        skill \"AB_EPICLESIS\", 5; \
        skill \"AB_PRAEFATIO\", 10; \
        skill \"AB_ORATIO\", 10; \
        skill \"AB_LAUDAAGNUS\", 4; \
        skill \"AB_LAUDARAMUS\", 4; \
        skill \"AB_EUCHARISTICA\", 0; \
        skill \"AB_RENOVATIO\", 1; \
        skill \"AB_HIGHNESSHEAL\", 5; \
        skill \"AB_CLEARANCE\", 5; \
        skill \"AB_EXPIATIO\", 5; \
        skill \"AB_DUPLELIGHT\", 10; \
        skill \"AB_DUPLELIGHT_MELEE\", 10; \
        skill \"AB_DUPLELIGHT_MAGIC\", 10; \
        skill \"AB_SILENTIUM\", 5; \
        skill \"AB_SECRAMENT\", 5; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Ranger skills
BUILDIN_FUNC(fakeranger) {
    static const char skillScript[] = "{ \
        skill \"RA_ARROWSTORM\", 10; \
        skill \"RA_FEARBREEZE\", 5; \
        skill \"RA_RANGERMAIN\", 10; \
        skill \"RA_AIMEDBOLT\", 10; \
        skill \"RA_DETONATOR\", 1; \
        skill \"RA_ELECTRICSHOCKER\", 5; \
        skill \"RA_CLUSTERBOMB\", 5; \
        skill \"RA_WUGMASTERY\", 1; \
        skill \"RA_WUGRIDER\", 3; \
        skill \"RA_WUGDASH\", 1; \
        skill \"RA_WUGSTRIKE\", 5; \
        skill \"RA_WUGBITE\", 5; \
        skill \"RA_TOOTHOFWUG\", 10; \
        skill \"RA_SENSITIVEKEEN\", 5; \
        skill \"RA_CAMOUFLAGE\", 5; \
        skill \"RA_RESEARCHTRAP\", 5; \
        skill \"RA_MAGENTATRAP\", 1; \
        skill \"RA_COBALTTRAP\", 1; \
        skill \"RA_MAIZETRAP\", 1; \
        skill \"RA_VERDURETRAP\", 1; \
        skill \"RA_FIRINGTRAP\", 5; \
        skill \"RA_ICEBOUNDTRAP\", 5; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Shadow Chase skills
BUILDIN_FUNC(fakeshadowchaser) {
    static const char skillScript[] = "{ \
        skill \"SC_FATALMENACE\", 5; \
        skill \"SC_REPRODUCE\", 10; \
        skill \"SC_AUTOSHADOWSPELL\", 10; \
        skill \"SC_SHADOWFORM\", 5; \
        skill \"SC_TRIANGLESHOT\", 10; \
        skill \"SC_BODYPAINT\", 5; \
        skill \"SC_INVISIBILITY\", 5; \
        skill \"SC_DEADLYINFECT\", 5; \
        skill \"SC_ENERVATION\", 3; \
        skill \"SC_GROOMY\", 3; \
        skill \"SC_IGNORANCE\", 3; \
        skill \"SC_LAZINESS\", 3; \
        skill \"SC_UNLUCKY\", 3; \
        skill \"SC_WEAKNESS\", 3; \
        skill \"SC_STRIPACCESSARY\", 5; \
        skill \"SC_MANHOLE\", 3; \
        skill \"SC_DIMENSIONDOOR\", 3; \
        skill \"SC_CHAOSPANIC\", 3; \
        skill \"SC_MAELSTROM\", 3; \
        skill \"SC_BLOODYLUST\", 3; \
        skill \"SC_FEINTBOMB\", 3; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Royal Guard skills
BUILDIN_FUNC(fakeroyalguard) {
    static const char skillScript[] = "{ \
        skill \"LG_CANNONSPEAR\", 5; \
        skill \"LG_BANISHINGPOINT\", 10; \
        skill \"LG_TRAMPLE\", 3; \
        skill \"LG_SHIELDPRESS\", 5; \
        skill \"LG_REFLECTDAMAGE\", 5; \
        skill \"LG_PINPOINTATTACK\", 5; \
        skill \"LG_FORCEOFVANGUARD\", 5; \
        skill \"LG_RAGEBURST\", 1; \
        skill \"LG_SHIELDSPELL\", 3; \
        skill \"LG_EXEEDBREAK\", 5; \
        skill \"LG_OVERBRAND\", 5; \
        skill \"LG_PRESTIGE\", 5; \
        skill \"LG_BANDING\", 5; \
        skill \"LG_MOONSLASHER\", 5; \
        skill \"LG_RAYOFGENESIS\", 5; \
        skill \"LG_PIETY\", 5; \
        skill \"LG_EARTHDRIVE\", 5; \
        skill \"LG_HESPERUSLIT\", 5; \
        skill \"LG_INSPIRATION\", 5; \
        skill \"LG_OVERBRAND_BRANDISH\", 5; \
        skill \"LG_OVERBRAND_PLUSATK\", 5; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Sura skills
BUILDIN_FUNC(fakesura) {
    static const char skillScript[] = "{ \
        skill \"SR_DRAGONCOMBO\", 10; \
        skill \"SR_SKYNETBLOW\", 5; \
        skill \"SR_EARTHSHAKER\", 5; \
        skill \"SR_FALLENEMPIRE\", 5; \
        skill \"SR_TIGERCANNON\", 10; \
        skill \"SR_HELLGATE\", 10; \
        skill \"SR_RAMPAGEBLASTER\", 5; \
        skill \"SR_CRESCENTELBOW\", 5; \
        skill \"SR_CURSEDCIRCLE\", 5; \
        skill \"SR_LIGHTNINGWALK\", 5; \
        skill \"SR_KNUCKLEARROW\", 5; \
        skill \"SR_WINDMILL\", 1; \
        skill \"SR_RAISINGDRAGON\", 10; \
        skill \"SR_GENTLETOUCH\", 5; \
        skill \"SR_ASSIMILATEPOWER\", 1; \
        skill \"SR_POWERVELOCITY\", 1; \
        skill \"SR_CRESCENTELBOW_AUTOSPELL\", 5; \
        skill \"SR_GATEOFHELL\", 10; \
        skill \"SR_GENTLETOUCH_QUIET\", 5; \
        skill \"SR_GENTLETOUCH_CURE\", 5; \
        skill \"SR_GENTLETOUCH_ENERGYGAIN\", 5; \
        skill \"SR_GENTLETOUCH_CHANGE\", 5; \
        skill \"SR_GENTLETOUCH_REVITALIZE\", 5; \
        skill \"SR_HOWLINGOFLION\", 5; \
        skill \"SR_RIDEINLIGHTNING\", 5; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Sorcerer skills
BUILDIN_FUNC(fakesorcerer) {
    static const char skillScript[] = "{ \
        skill \"SO_FIREWALK\", 5; \
        skill \"SO_ELECTRICWALK\", 5; \
        skill \"SO_SPELLFIST\", 5; \
        skill \"SO_EARTHGRAVE\", 5; \
        skill \"SO_DIAMONDDUST\", 5; \
        skill \"SO_POISON_BUSTER\", 5; \
        skill \"SO_PSYCHIC_WAVE\", 5; \
        skill \"SO_CLOUD_KILL\", 5; \
        skill \"SO_STRIKING\", 5; \
        skill \"SO_WARMER\", 5; \
        skill \"SO_VACUUM_EXTREME\", 5; \
        skill \"SO_VARETYR_SPEAR\", 5; \
        skill \"SO_ARRULLO\", 5; \
        skill \"SO_EL_CONTROL\", 4; \
        skill \"SO_SUMMON_AGNI\", 3; \
        skill \"SO_SUMMON_AQUA\", 3; \
        skill \"SO_SUMMON_VENTUS\", 3; \
        skill \"SO_SUMMON_TERA\", 3; \
        skill \"SO_EL_ACTION\", 1; \
        skill \"SO_EL_ANALYSIS\", 2; \
        skill \"SO_EL_SYMPATHY\", 5; \
        skill \"SO_EL_CURE\", 1; \
        skill \"SO_FIRE_INSIGNIA\", 3; \
        skill \"SO_WATER_INSIGNIA\", 3; \
        skill \"SO_WIND_INSIGNIA\", 3; \
        skill \"SO_EARTH_INSIGNIA\", 3; \
    }";
    
    return callScript(st, skillScript);
}

//Gives all Kagerou & Oboro skills
BUILDIN_FUNC(fakekageobo) {
    static const char skillScript[] = "{ \
        skill \"KO_YAMIKUMO\", 1; \
        skill \"KO_RIGHT\", 5; \
        skill \"KO_LEFT\", 5; \
        skill \"KO_JYUMONJIKIRI\", 5; \
        skill \"KO_SETSUDAN\", 5; \
        skill \"KO_BAKURETSU\", 5; \
        skill \"KO_HAPPOKUNAI\", 5; \
        skill \"KO_MUCHANAGE\", 10; \
        skill \"KO_HUUMARANKA\", 5; \
        skill \"KO_MAKIBISHI\", 5; \
        skill \"KO_MEIKYOUSISUI\", 5; \
        skill \"KO_ZANZOU\", 5; \
        skill \"KO_KYOUGAKU\", 5; \
        skill \"KO_JYUSATSU\", 5; \
        skill \"KO_KAHU_ENTEN\", 1; \
        skill \"KO_HYOUHU_HUBUKI\", 1; \
        skill \"KO_KAZEHU_SEIRAN\", 1; \
        skill \"KO_DOHU_KOUKAI\", 1; \
        skill \"KO_KAIHOU\", 1; \
        skill \"KO_ZENKAI\", 1; \
        skill \"KO_GENWAKU\", 5; \
        skill \"KO_IZAYOI\", 5; \
        skill \"KG_KAGEHUMI\", 5; \
        skill \"KG_KYOMU\", 5; \
        skill \"KG_KAGEMUSYA\", 5; \
        skill \"OB_ZANGETSU\", 5; \
        skill \"OB_OBOROGENSOU\", 5; \
        skill \"OB_OBOROGENSOU_TRANSITION_ATK\", 1; \
        skill \"OB_AKAITSUKI\", 5; \
    }";
    
    return callScript(st, skillScript);
}


//id,range,hit,inf,element,nk,splash,maxLvl,list_num,castcancel,cast_defence_rate,inf2,maxcount,skill_type,blow_count,inf3,name
//Regex to parse name and level: ^([\-\d\w:]+,){7}(\d+).+\t+([\w_]+),.*$
//Regex to format it: skill "$3",$2;