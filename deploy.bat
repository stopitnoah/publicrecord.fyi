@echo off
echo.
echo [ DEPLOYMENT INITIATED ]
echo -----------------------
echo Staging changes...
git add .
echo.
set /p commit_msg="ENTER UPDATE TEXT: "
if "%commit_msg%"=="" set commit_msg="Site update: %date% %time%"

echo.
echo Committing changes...
git commit -m "%commit_msg%"
echo.
echo Pushing to GitHub...
git push origin main
echo.
echo -----------------------
echo [ DEPLOYMENT COMMAND SENT ]
echo Check Vercel dashboard for status.
pause
