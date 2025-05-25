@echo off
setlocal enabledelayedexpansion

:: Percorso sorgente (dove fai i backup locali, sulla chiavetta)
set "SOURCE=E:\backup"

:: Percorso destinazione (la cartella condivisa SMB)
set "DESTINATION=D:\Backup\Crypto-Web"

:LOOP

:: Copia solo i file nuovi o modificati
robocopy "%SOURCE%" "%DESTINATION%" /E /XO /FFT /Z /R:2 /W:5
powershell -Command "Import-Module BurntToast; New-BurntToastNotification -Text 'Backup HDD completato! ', 'Salvato alle %TIME% nel HDD Giampyyyy!!!!' -AppLogo 'assets/icon-save.png' -Silent"

:: Aspetta 15 minuti (900 secondi)
timeout /t 900 /nobreak > nul

goto LOOP
