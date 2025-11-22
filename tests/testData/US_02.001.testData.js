export const TestData = {
    project: {
        name: "test-freestyle",
        displayName: "TestFreestyleProject"
    },
    
    dropdown: {
        expectedCount: 7,
        items: [
            "Changes", 
            "Workspace", 
            "Build Now", 
            "Configure", 
            "Delete Project", 
            "Rename", 
            "Credentials"
        ]
    },
    
    configuration: {
        toggle: {
            states: {
                on: "ON",
                off: "OFF"
            },
            labels: {
                enabled: "Enabled",
                disabled: "Disabled"
            },
            tooltips: {
                enable: "Enable the project",
                disable: "Disable the project"
            }
        },
        buttons: {
            save: "Save",
            apply: "Apply"
        }
    },
    
    status: {
        enabled: "Project is enabled",
        disabled: "This project is currently disabled"
    },

    get ItemsOnDropdown() {
        return {
            name: this.project.name,
            expectedCount: this.dropdown.expectedCount,
            listItemMenu: this.dropdown.items
        };
    }
};