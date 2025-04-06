// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Modals
    const employeeReviewModal = document.getElementById('employee-review-modal');
    const performanceModal = document.getElementById('performance-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Forms
    const teamForm = document.getElementById('team-form');
    const projectForm = document.getElementById('project-form');
    
    // Hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    
    // Employee search
    const employeeSearch = document.getElementById('employee-search');
    
    // Dummy data for employees
    const employees = [
        { id: 1, name: 'Employee 1', position: 'Frontend Developer', task: 'Homepage Redesign', taskDescription: 'Redesign the company homepage with new branding elements.' },
        { id: 2, name: 'Employee 2', position: 'Backend Developer', task: 'API Integration', taskDescription: 'Integrate payment gateway API with the current system.' },
        { id: 3, name: 'Employee 3', position: 'UI/UX Designer', task: 'Mobile App Design', taskDescription: 'Create wireframes and mockups for the new mobile application.' },
        { id: 4, name: 'Employee 4', position: 'QA Engineer', task: 'Testing Automation', taskDescription: 'Develop automated test scripts for the checkout process.' },
        { id: 5, name: 'Employee 5', position: 'Project Manager', task: 'Sprint Planning', taskDescription: 'Organize and plan the next sprint for the development team.' },
        { id: 6, name: 'Employee 6', position: 'DevOps Engineer', task: 'CI/CD Pipeline', taskDescription: 'Set up continuous integration and deployment pipeline.' },
        { id: 7, name: 'Employee 7', position: 'Data Analyst', task: 'User Behavior Analysis', taskDescription: 'Analyze user behavior data and create reports.' },
        { id: 8, name: 'Employee 8', position: 'Content Writer', task: 'Product Descriptions', taskDescription: 'Write compelling product descriptions for the new catalog.' }
    ];
    
    // Initialize the page
    init();
    
    function init() {
        // Generate employee cards
        generateEmployeeCards(employees);
        
        // Initialize charts
        initializeCharts();
        
        // Set up event listeners
        setupEventListeners();
        
        // Add animation classes to elements
        addAnimationClasses();
    }
    
    function setupEventListeners() {
        // Menu navigation
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetSection = item.getAttribute('data-section');
                
                // Update active menu item
                menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                item.classList.add('active');
                
                // Show target section
                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                        // Add animation to the section
                        section.style.animation = 'none';
                        setTimeout(() => {
                            section.style.animation = 'fadeIn 0.5s ease-out';
                        }, 10);
                    }
                });
            });
        });
        
        // Hamburger menu toggle
        hamburgerMenu.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
        });
        
        // Close modals
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                employeeReviewModal.classList.remove('active');
                performanceModal.classList.remove('active');
            });
        });
        
        // Team form submission
        if (teamForm) {
            teamForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const teamId = document.getElementById('team-id').value;
                const teamName = document.getElementById('team-name').value;
                const teamManager = document.getElementById('team-manager').value;
                
                // Get selected employees
                const selectedEmployees = [];
                document.querySelectorAll('.employee-checkbox input:checked').forEach(checkbox => {
                    selectedEmployees.push(checkbox.value);
                });
                
                // Simulate saving team
                saveTeam({
                    id: teamId,
                    name: teamName,
                    manager: teamManager,
                    employees: selectedEmployees
                });
                
                // Show success message
                showNotification('Team created successfully!');
                
                // Reset form
                teamForm.reset();
            });
        }
        
        // Project form submission
        if (projectForm) {
            projectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const projectName = document.getElementById('project-name').value;
                const projectTeam = document.getElementById('project-team').value;
                const projectDeadline = document.getElementById('project-deadline').value;
                const projectDescription = document.getElementById('project-description').value;
                
                // Simulate assigning project
                assignProject({
                    name: projectName,
                    team: projectTeam,
                    deadline: projectDeadline,
                    description: projectDescription
                });
                
                // Show success message
                showNotification('Project assigned successfully!');
                
                // Reset form
                projectForm.reset();
            });
        }
        
        // Employee search
        if (employeeSearch) {
            employeeSearch.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterEmployees(searchTerm);
            });
        }
        
        // Set up review and performance buttons (will be added to dynamically created elements)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('review-btn')) {
                const employeeId = e.target.getAttribute('data-employee-id');
                openReviewModal(employeeId);
            }
            
            if (e.target.classList.contains('performance-btn')) {
                const employeeId = e.target.getAttribute('data-employee-id');
                openPerformanceModal(employeeId);
            }
        });
        
        // Verify and reassign task buttons
        document.getElementById('verify-task').addEventListener('click', () => {
            const feedback = document.getElementById('review-feedback').value;
            if (feedback.trim() === '') {
                alert('Please provide feedback before verifying the task.');
                return;
            }
            
            // Simulate task verification
            showNotification('Task verified successfully!');
            employeeReviewModal.classList.remove('active');
        });
        
        document.getElementById('reassign-task').addEventListener('click', () => {
            const feedback = document.getElementById('review-feedback').value;
            if (feedback.trim() === '') {
                alert('Please provide feedback before reassigning the task.');
                return;
            }
            
            // Simulate task reassignment
            showNotification('Task reassigned successfully!');
            employeeReviewModal.classList.remove('active');
        });
    }
    
    function generateEmployeeCards(employeeList) {
        const employeeCardsContainer = document.querySelector('.employee-cards');
        if (!employeeCardsContainer) return;
        
        employeeCardsContainer.innerHTML = '';
        
        employeeList.forEach(employee => {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.setAttribute('data-employee-id', employee.id);
            
            card.innerHTML = `
                <div class="employee-header">
                    <img src="https://via.placeholder.com/60" alt="${employee.name}" class="employee-avatar">
                    <div>
                        <h3 class="employee-name">${employee.name}</h3>
                        <p class="employee-position">${employee.position}</p>
                    </div>
                </div>
                <div class="employee-info">
                    <div class="info-item">
                        <span class="info-label">Current Task:</span>
                        <span>${employee.task}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span>In Progress</span>
                    </div>
                </div>
                <div class="employee-actions">
                    <button class="action-btn review-btn" data-employee-id="${employee.id}">Review Work</button>
                    <button class="action-btn performance-btn" data-employee-id="${employee.id}">View Performance</button>
                </div>
            `;
            
            // Add animation delay for staggered appearance
            const delay = 0.1 * (employee.id - 1);
            card.style.animationDelay = ${delay}s;
            
            employeeCardsContainer.appendChild(card);
        });
    }
    
    function filterEmployees(searchTerm) {
        const filteredEmployees = employees.filter(employee => {
            return (
                employee.name.toLowerCase().includes(searchTerm) ||
                employee.position.toLowerCase().includes(searchTerm) ||
                employee.task.toLowerCase().includes(searchTerm)
            );
        });
        
        generateEmployeeCards(filteredEmployees);
    }
    
    function openReviewModal(employeeId) {
        const employee = employees.find(emp => emp.id == employeeId);
        if (!employee) return;
        
        // Set modal content
        document.getElementById('modal-employee-name').textContent = employee.name;
        document.getElementById('modal-employee-position').textContent = employee.position;
        document.getElementById('modal-task-name').textContent = employee.task;
        document.getElementById('modal-task-description').textContent = employee.taskDescription;
        
        // Clear feedback field
        document.getElementById('review-feedback').value = '';
        
        // Show modal with animation
        employeeReviewModal.classList.add('active');
    }
    
    function openPerformanceModal(employeeId) {
        const employee = employees.find(emp => emp.id == employeeId);
        if (!employee) return;
        
        // Set modal content
        document.getElementById('modal-performance-name').textContent = employee.name;
        
        // Update charts with employee-specific data
        updatePerformanceCharts(employeeId);
        
        // Show modal with animation
        performanceModal.classList.add('active');
    }
    
    function initializeCharts() {
        // Team productivity chart
        const productivityCtx = document.getElementById('productivity-chart');
        if (productivityCtx) {
            new Chart(productivityCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Productivity Score',
                        data: [65, 72, 78, 75, 82, 88],
                        borderColor: '#4a6cf7',
                        backgroundColor: 'rgba(74, 108, 247, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Team Productivity Trend'
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
        
        // Project completion chart
        const completionCtx = document.getElementById('completion-chart');
        if (completionCtx) {
            new Chart(completionCtx, {
                type: 'bar',
                data: {
                    labels: ['Design Team', 'Frontend Team', 'Backend Team', 'QA Team'],
                    datasets: [{
                        label: 'Completed',
                        data: [8, 12, 10, 15],
                        backgroundColor: '#28a745'
                    }, {
                        label: 'In Progress',
                        data: [4, 6, 8, 3],
                        backgroundColor: '#ffc107'
                    }, {
                        label: 'Pending',
                        data: [2, 3, 5, 1],
                        backgroundColor: '#dc3545'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Project Status by Team'
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
    }
    
    function updatePerformanceCharts(employeeId) {
        // Generate random data based on employee ID for demonstration
        const seed = employeeId * 10;
        
        // Employee performance chart
        const performanceCtx = document.getElementById('employee-performance-chart');
        if (performanceCtx) {
            // Destroy previous chart if exists
            if (performanceCtx.chart) {
                performanceCtx.chart.destroy();
            }
            
            // Create new chart
            performanceCtx.chart = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Performance Score',
                        data: [
                            70 + (seed % 20),
                            75 + (seed % 15),
                            80 + (seed % 10),
                            85 + (seed % 5)
                        ],
                        borderColor: '#4a6cf7',
                        backgroundColor: 'rgba(74, 108, 247, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 100
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
        
        // Task completion chart
        const taskCtx = document.getElementById('task-completion-chart');
        if (taskCtx) {
            // Destroy previous chart if exists
            if (taskCtx.chart) {
                taskCtx.chart.destroy();
            }
            
            // Create new chart
            taskCtx.chart = new Chart(taskCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'Pending'],
                    datasets: [{
                        data: [
                            5 + (seed % 5),
                            3 + (seed % 3),
                            1 + (seed % 2)
                        ],
                        backgroundColor: [
                            '#28a745',
                            '#ffc107',
                            '#dc3545'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    animation: {
                        duration: 1000,
                        animateRotate: true,
                        animateScale: true
                    }
                }
            });
        }
    }
    
    function saveTeam(team) {
        // In a real application, this would send data to a server
        console.log('Team saved:', team);
        
        // For demo purposes, we'll store in localStorage
        let teams = JSON.parse(localStorage.getItem('teams') || '[]');
        teams.push(team);
        localStorage.setItem('teams', JSON.stringify(teams));
    }
    
    function assignProject(project) {
        // In a real application, this would send data to a server
        console.log('Project assigned:', project);
        
        // For demo purposes, we'll store in localStorage
        let projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4a6cf7';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Add to document
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function addAnimationClasses() {
        // Add staggered animation to menu items
        menuItems.forEach((item, index) => {
            item.style.animationDelay = ${0.1 * index}s;
        });
        
        // Add animation to charts
        document.querySelectorAll('.chart-container').forEach((chart, index) => {
            chart.style.animationDelay = ${0.2 * index}s;
        });
    }
});