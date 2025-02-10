# Design Decisions
# Component Heirarchy
    What components to create vs code directly into app
    - created components for every major function to increase readability, reusability and ease of maintanence
# Database Communication
    When to send updates to Database
    - on state change, send update to db and then update state in UI
    - this is to make sure that db is updated before showing new state
    - may not be best for high traffic but this is a personal project so should work fine
    