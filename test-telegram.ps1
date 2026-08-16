#!/usr/bin/env pwsh
# Test Telegram Bot Integration
# Usage: .\test-telegram.ps1

param(
    [switch]$SendTest,
    [string]$Message = ""
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Telegram Bot Integration Test" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if dev server is running
Write-Host "Checking dev server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method HEAD -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✓ Dev server is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Dev server is not running" -ForegroundColor Red
    Write-Host "`nPlease start dev server first:" -ForegroundColor Yellow
    Write-Host "  npm run dev`n" -ForegroundColor White
    exit 1
}

# Step 1: Check bot configuration
Write-Host "`n----------------------------------------" -ForegroundColor Cyan
Write-Host "Step 1: Checking bot configuration" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/telegram/test" -Method GET

    if ($response.success) {
        Write-Host "✓ Bot token is valid" -ForegroundColor Green
        Write-Host "`nBot Information:" -ForegroundColor Yellow
        Write-Host "  ID:       $($response.bot.id)" -ForegroundColor White
        Write-Host "  Username: @$($response.bot.username)" -ForegroundColor White
        Write-Host "  Name:     $($response.bot.first_name)" -ForegroundColor White
        Write-Host "`nConfiguration:" -ForegroundColor Yellow
        Write-Host "  Chat ID:  $($response.config.chat_id)" -ForegroundColor White
        Write-Host "`n✓ Bot configuration is correct!" -ForegroundColor Green
    } else {
        Write-Host "✗ Bot configuration failed" -ForegroundColor Red
        Write-Host "Error: $($response.error)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "✗ Failed to check bot configuration" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Send test message (if requested)
if ($SendTest) {
    Write-Host "`n----------------------------------------" -ForegroundColor Cyan
    Write-Host "Step 2: Sending test message" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Cyan

    $body = @{}
    if ($Message) {
        $body.message = $Message
    }
    $jsonBody = $body | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/telegram/test" -Method POST -Body $jsonBody -ContentType "application/json"

        if ($response.success) {
            Write-Host "✓ Test message sent successfully!" -ForegroundColor Green
            Write-Host "`nMessage ID: $($response.result.message_id)" -ForegroundColor White
            Write-Host "`n✓ Check your Telegram group to see the message!" -ForegroundColor Green
        } else {
            Write-Host "✗ Failed to send test message" -ForegroundColor Red
            Write-Host "Error: $($response.error)" -ForegroundColor Red

            if ($response.error -like "*chat not found*") {
                Write-Host "`n⚠️  Bot hasn't been added to the group yet!" -ForegroundColor Yellow
                Write-Host "`nPlease add bot to your Telegram group:" -ForegroundColor Yellow
                Write-Host "  1. Open Telegram" -ForegroundColor White
                Write-Host "  2. Go to your group (ID: $($response.config.chat_id))" -ForegroundColor White
                Write-Host "  3. Add Members → Search: @$($response.bot.username)" -ForegroundColor White
                Write-Host "  4. Add bot to group" -ForegroundColor White
                Write-Host "  5. Give bot 'Post Messages' permission" -ForegroundColor White
                Write-Host "  6. Run this script again with -SendTest`n" -ForegroundColor White
            }
            exit 1
        }
    } catch {
        Write-Host "✗ Failed to send test message" -ForegroundColor Red

        # Try to get error details
        if ($_.Exception.Response) {
            $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
            $errorBody = $reader.ReadToEnd()
            $errorJson = $errorBody | ConvertFrom-Json

            Write-Host "Error: $($errorJson.error)" -ForegroundColor Red

            if ($errorJson.error -like "*chat not found*") {
                Write-Host "`n⚠️  Bot hasn't been added to the group yet!" -ForegroundColor Yellow
                Write-Host "`nPlease add bot to your Telegram group:" -ForegroundColor Yellow
                Write-Host "  1. Open Telegram" -ForegroundColor White
                Write-Host "  2. Search for: @Claude_code_aptech_bot" -ForegroundColor White
                Write-Host "  3. Go to your group" -ForegroundColor White
                Write-Host "  4. Add Members → Select the bot" -ForegroundColor White
                Write-Host "  5. Give bot 'Post Messages' permission" -ForegroundColor White
                Write-Host "  6. Run this script again with -SendTest`n" -ForegroundColor White
            }
        } else {
            Write-Host "Error: $_" -ForegroundColor Red
        }
        exit 1
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Test Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($SendTest) {
    Write-Host "✓ Bot configuration: OK" -ForegroundColor Green
    Write-Host "✓ Test message: Sent" -ForegroundColor Green
    Write-Host "`n🎉 All tests passed!" -ForegroundColor Green
    Write-Host "`nNext step: Test registration form" -ForegroundColor Yellow
    Write-Host "  1. Open: http://localhost:3000/tieng-trung-tue-lam" -ForegroundColor White
    Write-Host "  2. Click 'Đăng Ký Học Thử Miễn Phí'" -ForegroundColor White
    Write-Host "  3. Fill form and submit" -ForegroundColor White
    Write-Host "  4. Check Telegram group for notification`n" -ForegroundColor White
} else {
    Write-Host "✓ Bot configuration: OK" -ForegroundColor Green
    Write-Host "`nTo send a test message, run:" -ForegroundColor Yellow
    Write-Host "  .\test-telegram.ps1 -SendTest" -ForegroundColor White
    Write-Host "`nOr with custom message:" -ForegroundColor Yellow
    Write-Host "  .\test-telegram.ps1 -SendTest -Message 'Hello from PowerShell!'`n" -ForegroundColor White
}

Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  TELEGRAM_SETUP.md  - Full setup guide" -ForegroundColor White
Write-Host "  QUICK_START.md     - Quick troubleshooting" -ForegroundColor White
Write-Host "  FORM_REGISTRATION.md - Form details`n" -ForegroundColor White
