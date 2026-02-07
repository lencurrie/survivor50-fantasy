import { test, expect } from "@playwright/test";

test.describe("Survivor 50 Fantasy League", () => {
  test("homepage loads with correct branding", async ({ page }) => {
    await page.goto("/");

    // Check for Survivor branding (new design)
    await expect(page.getByText("SURVIVOR")).toBeVisible();
    await expect(page.getByText("FANTASY LEAGUE")).toBeVisible();

    // Check for CTA buttons
    await expect(page.getByRole("button", { name: /ENTER THE GAME|GO TO DASHBOARD/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "HOW IT WORKS" })).toBeVisible();
  });

  test("sign up button opens sign-up modal", async ({ page }) => {
    await page.goto("/");

    // Click the main CTA
    const signUpButton = page.getByRole("button", { name: "ENTER THE GAME" });
    await expect(signUpButton).toBeVisible();
    await signUpButton.click();

    // Should show Clerk sign-up modal (iframe or modal appears)
    await expect(page.locator("iframe[title*='Clerk']").or(page.locator("[data-clerk-component='SignUp']"))).toBeVisible({ timeout: 10000 });
  });

  test("features section displays correctly", async ({ page }) => {
    await page.goto("/");
    
    // Check for feature cards
    await expect(page.getByText("DRAFT YOUR TRIBE")).toBeVisible();
    await expect(page.getByText("MAKE PREDICTIONS")).toBeVisible();
    await expect(page.getByText("CLAIM VICTORY")).toBeVisible();
    
    // Check scoring system
    await expect(page.getByText("SCORING SYSTEM")).toBeVisible();
    await expect(page.getByText("CASTAWAY ACHIEVEMENTS")).toBeVisible();
    await expect(page.getByText("PREDICTIONS & BONUSES")).toBeVisible();
  });

  test("navigation works correctly", async ({ page }) => {
    await page.goto("/");
    
    // Check for navigation
    await expect(page.getByRole("navigation")).toBeVisible();
    
    // Sign in button should be visible
    await expect(page.getByRole("button", { name: "SIGN IN" })).toBeVisible();
  });

  test("how it works section is accessible", async ({ page }) => {
    await page.goto("/");
    
    // Click How It Works
    await page.getByRole("link", { name: "HOW IT WORKS" }).click();
    
    // Should scroll to the section
    await expect(page.getByText("THE GAME PLAN")).toBeVisible();
    await expect(page.getByText("CREATE OR JOIN")).toBeVisible();
    await expect(page.getByText("DRAFT CASTAWAYS")).toBeVisible();
    await expect(page.getByText("PREDICT VOTES")).toBeVisible();
    await expect(page.getByText("SCORE POINTS")).toBeVisible();
  });

  test("scoring points are displayed", async ({ page }) => {
    await page.goto("/");

    // Check for scoring section
    await expect(page.getByText("SCORING")).toBeVisible();
    await expect(page.getByText("CASTAWAY ACHIEVEMENTS")).toBeVisible();
    await expect(page.getByText("PREDICTIONS & BONUSES")).toBeVisible();

    // Check for scoring values
    await expect(page.getByText("+2").first()).toBeVisible(); // Immunity
    await expect(page.getByText("+5").first()).toBeVisible(); // Idol
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    
    await expect(page.getByText("OUTWIT • OUTPLAY • OUTLAST")).toBeVisible();
    await expect(page.getByText(/Not affiliated with CBS/i)).toBeVisible();
  });
});

test.describe("Authentication Flows", () => {
  test("sign in page loads", async ({ page }) => {
    await page.goto("/sign-in");
    
    // Clerk sign-in should be present
    await expect(page.locator("[data-clerk-component='SignIn']")).toBeVisible();
  });

  test("sign up page loads", async ({ page }) => {
    await page.goto("/sign-up");
    
    // Clerk sign-up should be present
    await expect(page.locator("[data-clerk-component='SignUp']")).toBeVisible();
  });
});

test.describe("Dashboard (Protected Route)", () => {
  test("redirects to sign-in when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/.*sign-in.*/);
  });
});
