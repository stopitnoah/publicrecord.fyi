@echo off
echo.
echo [ DEPLOYMENT INITIATED ]
echo -----------------------
echo Staging changes...
git add .
echo Committing changes...
git commit -m "Site update: %date% %time%"
echo Pushing to GitHub...
git push origin main
echo.
echo -----------------------
echo [ DEPLOYMENT COMMAND SENT ]
echo Check Vercel dashboard for status.
pause
