for /R %%i IN (*.avif) DO (
    avifdec.exe -j 8 "%%i" "%%~pi%%~ni.png"
    IF EXIST "%%~pi%%~ni.png" CALL erase "%%i"
)

:: erase "avifdec.exe"
:: DEL "%~f0"
