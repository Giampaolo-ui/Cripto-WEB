@echo off
setlocal enabledelayedexpansion
title Backup Manager by Giampy

:: ======= CONFIGURAZIONE =======
set "SOURCE=%USERPROFILE%\Desktop\Cripto-WEB\"
set "USB_DRIVE=E:\backup"
set "HDD_DEST=D:\Backup\Crypto-Web"
:: ================================

:MENU
cls
echo ================================
echo      BACKUP MANAGER V2.0
echo ================================
echo 1. Mostra lista backup USB
echo 2. Mostra lista backup HDD
echo 3. Ripristina backup da USB
echo 4. Ripristina backup da HDD
echo 5. Esci
echo ================================
set /p choice="Scegli un'opzione (1-5): "

if "%choice%"=="1" goto LIST_USB
if "%choice%"=="2" goto LIST_HDD
if "%choice%"=="3" goto RESTORE_USB
if "%choice%"=="4" goto RESTORE_HDD
if "%choice%"=="5" exit /b
goto MENU

:LIST_USB
cls
echo ===== Lista backup disponibili su USB =====
for /f "delims=" %%D in ('dir "%USB_DRIVE%" /b /ad') do (
    echo ► %%D
    for /f "delims=" %%T in ('dir "%USB_DRIVE%\%%D" /b /ad') do (
        echo     - %%T
    )
)
echo ===========================================
pause
goto MENU

:LIST_HDD
cls
echo ===== Lista backup disponibili su HDD =====
for /f "delims=" %%D in ('dir "%HDD_DEST%" /b /ad') do (
    echo ► %%D
    for /f "delims=" %%T in ('dir "%HDD_DEST%\%%D" /b /ad') do (
        echo     - %%T
    )
)
echo ===========================================
pause
goto MENU

:RESTORE_USB
cls
echo ==== Ripristino da USB ====
echo Inserisci la data del backup (es: 23-04-2025):
set /p RDATE=
set "SRC=%USB_DRIVE%\%RDATE%"
if not exist "%SRC%" (
    echo ❌ Data non valida! Torno al menu...
    timeout /t 2 /nobreak >nul
    goto MENU
)
echo Backup orari disponibili in %RDATE%:
for /f "delims=" %%T in ('dir "%SRC%" /b /ad') do echo - %%T
echo Inserisci l'orario del backup (es: 15-30-00):
set /p RTIME=
set "FULLSRC=%SRC%\%RTIME%"
if not exist "%FULLSRC%" (
    echo ❌ Orario non valido! Torno al menu...
    timeout /t 2 /nobreak >nul
    goto MENU
)
echo Ripristino in corso da "%FULLSRC%" verso "%SOURCE%"...
xcopy "%FULLSRC%\*" "%SOURCE%\" /E /H /C /I /Y
echo ✅ Ripristino completato!
pause
goto MENU

:RESTORE_HDD
cls
echo ==== Ripristino da HDD ====
echo Inserisci la data del backup (es: 23-04-2025):
set /p RDATE2=
set "SRC2=%HDD_DEST%\%RDATE2%"
if not exist "%SRC2%" (
    echo ❌ Data non valida! Torno al menu...
    timeout /t 2 /nobreak >nul
    goto MENU
)
echo Backup orari disponibili in %RDATE2%:
for /f "delims=" %%T in ('dir "%SRC2%" /b /ad') do echo - %%T
echo Inserisci l'orario del backup (es: 15-30-00):
set /p RTIME2=
set "FULLSRC2=%SRC2%\%RTIME2%"
if not exist "%FULLSRC2%" (
    echo ❌ Orario non valido! Torno al menu...
    timeout /t 2 /nobreak >nul
    goto MENU
)
echo Ripristino in corso da "%FULLSRC2%" verso "%SOURCE%"...
xcopy "%FULLSRC2%\*" "%SOURCE%\" /E /H /C /I /Y
echo ✅ Ripristino completato!
pause
goto MENU
