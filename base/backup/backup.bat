@echo off
setlocal enabledelayedexpansion

:: Percorso della cartella da copiare
set "SOURCE=%USERPROFILE%\Desktop\Cripto-WEB"

:: Percorso della chiavetta
set "DRIVE=E:\backup"

:LOOP
:: Prendi data e ora formattati
for /f "tokens=1-3 delims=/" %%a in ('date /t') do (
    set "DAY=%%a"
    set "MONTH=%%b"
    set "YEAR=%%c"
)
for /f "tokens=1-2 delims=:" %%a in ('time /t') do (
    set "HOUR=%%a"
    set "MINUTE=%%b"
)

:: Pulisci eventuali spazi
set "DAY=%DAY: =%"
set "MONTH=%MONTH: =%"
set "YEAR=%YEAR: =%"
set "HOUR=%HOUR: =%"
set "MINUTE=%MINUTE: =%"

:: Formatta data e ora
set "DATE_FOLDER=%DAY%-%MONTH%-%YEAR%"
set "TIME_FOLDER=%HOUR%-%MINUTE%-00"

:: Crea cartella del giorno se non esiste
if not exist "%DRIVE%\%DATE_FOLDER%" (
    mkdir "%DRIVE%\%DATE_FOLDER%"
)

:: Crea cartella per il backup con l'orario
mkdir "%DRIVE%\%DATE_FOLDER%\%TIME_FOLDER%"

echo "%SOURCE%\*"

:: Copia il contenuto della cartella sorgente
xcopy "%SOURCE%\*" "%DRIVE%\%DATE_FOLDER%\%TIME_FOLDER%\" /E /H /C /I /Y
:: Dentro la cartella del backup appena creato
echo %YEAR%-%MONTH%-%DAY%T%HOUR%:%MINUTE%:00 > "%DRIVE%\%DATE_FOLDER%\%TIME_FOLDER%\base\backup\backupinfo.txt"
echo %YEAR%-%MONTH%-%DAY%T%HOUR%:%MINUTE%:00 > "%SOURCE%\base\backup\backupinfo.txt"

powershell -Command "Import-Module BurntToast; New-BurntToastNotification -Text 'Backup completato! ', 'Salvato alle %TIME% Giampyyyy!!!!' -AppLogo 'assets/icon-save.png' -Silent"

:: Aspetta 10 minuti (600 secondi)
timeout /t 300 /nobreak > nul

:: Ritorna al loop
goto LOOP
