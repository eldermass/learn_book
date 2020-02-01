@echo off
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

if '%errorlevel%' NEQ '0' (

goto UACPrompt
 
) else ( goto gotAdmin )


 
:UACPrompt

echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
 
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
 
"%temp%\getadmin.vbs"

exit /B


 
:gotAdmin

:: 查看服务是否开启

for /f "skip=3 tokens=4" %%i in ('sc query com.docker.service') do set "zt=%%i" &goto :next
:next
if /i "%zt%"=="RUNNING" (
    echo 'service is running, start container'
    goto :running
) else (
    echo 'service is stopping, start com.docker.service'
    goto :stopping
)


:stopping
net start com.docker.service
exit /B

:running
e:

cd E:\project\laradock

docker-compose up -d nginx mysql redis