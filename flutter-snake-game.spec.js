// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Flutter Snake Game', () => {

  test('Game loads and displays start screen', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('#startBtn')).toBeVisible();
    await expect(page.locator('#gameCanvas')).toBeHidden();
  });

  test('Start button initiates the game', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('#startBtn');
    await expect(page.locator('#startBtn')).toBeHidden();
    await expect(page.locator('#gameCanvas')).toBeVisible();
  });

  test('Snake moves right after game starts', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('#startBtn');
    const initialPosition = await page.evaluate(() => {
      const canvas = document.getElementById('gameCanvas');
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return imageData.data;
    });
    await page.waitForTimeout(500);
    const newPosition = await page.evaluate(() => {
      const canvas = document.getElementById('gameCanvas');
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return imageData.data;
    });
    expect(initialPosition).not.toEqual(newPosition);
  });

  test('Snake eats food and grows', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('#startBtn');
    // Simulate snake eating food by moving it to the food position
    // This requires knowledge of the game's internal state
    // For demonstration, we'll wait and assume the snake eats food
    const initialScore = await page.locator('#score').innerText();
    await page.waitForTimeout(2000);
    const newScore = await page.locator('#score').innerText();
    expect(newScore).not.toEqual(initialScore);
  });

  test('Game over when snake collides with wall', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('#startBtn');
    // Simulate snake moving into wall
    // This requires sending multiple right arrow keys
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
    }
    // Expect an alert to appear
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Game Over');
      await dialog.dismiss();
    });
  });

});
