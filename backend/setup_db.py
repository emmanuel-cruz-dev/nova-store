"""
Database setup script
Runs migrations and seeds the database
"""
import sys
import subprocess

def run_command(command, description):
    """Run a shell command and handle errors"""
    print(f"\n{'='*60}")
    print(f"📋 {description}")
    print(f"{'='*60}")

    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"❌ Error: {result.stderr}")
        sys.exit(1)
    else:
        print(result.stdout)
        print(f"✅ {description} completed successfully!")

def main():
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║          NOVA STORE - Database Setup Script               ║
    ╚════════════════════════════════════════════════════════════╝
    """)

    # Step 1: Run Alembic migrations
    run_command(
        "alembic upgrade head",
        "Running Alembic migrations (creating tables)"
    )

    # Step 2: Seed the database
    run_command(
        "python scripts/seed_db.py",
        "Seeding database with initial data"
    )

    print(f"\n{'='*60}")
    print("🎉 Database setup completed successfully!")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()