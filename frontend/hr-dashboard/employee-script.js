// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Task buttons
    const startTaskBtns = document.querySelectorAll('.start-task-btn');
    const pauseTaskBtns = document.querySelectorAll('.pause-task-btn');
    const submitTaskBtns = document.querySelectorAll('.submit-task-btn');
    const viewFeedbackBtns = document.querySelectorAll('.view-feedback-btn');
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Calendar elements
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.getElementById('current-month');
    const calendarDaysEl = document.getElementById('calendar-days');
    const selectedDateEl = document.getElementById('selected-date');
    
    // Modals
    const feedbackModal = document.getElementById('feedback-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    
    // Task search
    const taskSearch = document.getElementById('task-search');
    
    // Current date
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Initialize the page
    init();
    
    function init() {
        // Set up event listeners
        setupEventListeners();
        
        // Initialize calendar
        renderCalendar(currentMonth, currentYear);
        
        // Initialize performance mini calendar
        initializeMiniCalendar();
        
        // Initialize charts
        initializeCharts();
        
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
        
        // View all button in dashboard
        document.querySelector('.view-all-btn').addEventListener('click', (e) => {
            const targetSection = e.target.getAttribute('data-section');
            
            // Update active menu item
            menuItems.forEach(menuItem => {
                if (menuItem.getAttribute('data-section') === targetSection) {
                    menuItem.click();
                }
            });
        });
        
        // Task buttons
        startTaskBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.getAttribute('data-task-id');
                startTask(taskId, e.target);
            });
        });
        
        pauseTaskBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.getAttribute('data-task-id');
                pauseTask(taskId, e.target);
            });
        });
        
        submitTaskBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.getAttribute('data-task-id');
                submitTask(taskId, e.target);
            });
        });
        
        viewFeedbackBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.getAttribute('data-task-id');
                openFeedbackModal(taskId);
            });
        });
        
        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active filter
                filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter tasks
                filterTasks(filter);
            });
        });
        
        // Calendar navigation
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
        
        // Hamburger menu toggle
        hamburgerMenu.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
        });
        
        // Close modals
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                feedbackModal.classList.remove('active');
            });
        });
        
        // Task search
        if (taskSearch) {
            taskSearch.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                searchTasks(searchTerm);
            });
        }
        
        // New task form submission
        const newTaskForm = document.getElementById('new-task-form');
        if (newTaskForm) {
            newTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const taskTitle = document.getElementById('task-title').value;
                const taskDescription = document.getElementById('task-description').value;
                const taskProject = document.getElementById('task-project').value;
                const taskPriority = document.getElementById('task-priority').value;
                const taskDueDate = document.getElementById('task-due-date').value;
                const taskEstimatedTime = document.getElementById('task-estimated-time').value;
                
                // Simulate adding task
                addNewTask({
                    title: taskTitle,
                    description: taskDescription,
                    project: taskProject,
                    priority: taskPriority,
                    dueDate: taskDueDate,
                    estimatedTime: taskEstimatedTime
                });
                
                // Show success message
                showNotification('Task added successfully!');
                
                // Reset form
                newTaskForm.reset();
            });
        }
    }
    
    function startTask(taskId, button) {
        // Find the task card
        const taskCard = button.closest('.task-card') || button.closest('.task-item');
        
        // Find the buttons
        const pauseBtn = taskCard.querySelector('.pause-task-btn');
        const submitBtn = taskCard.querySelector('.submit-task-btn');
        
        // Hide start button, show pause and submit buttons
        button.classList.add('hidden');
        if (pauseBtn) pauseBtn.classList.remove('hidden');
        if (submitBtn) submitBtn.classList.remove('hidden');
        
        // Show notification
        showNotification(Timer started for task #${taskId});
        
        // In a real application, this would start a timer in the backend
        console.log(Started task #${taskId});
    }
    
    function pauseTask(taskId, button) {
        // Find the task card
        const taskCard = button.closest('.task-card') || button.closest('.task-item');
        
        // Find the buttons
        const startBtn = taskCard.querySelector('.start-task-btn');
        
        // Hide pause button, show start button
        button.classList.add('hidden');
        if (startBtn) startBtn.classList.remove('hidden');
        
        // Show notification
        showNotification(Timer paused for task #${taskId});
        
        // In a real application, this would pause a timer in the backend
        console.log(Paused task #${taskId});
    }
    
    function submitTask(taskId, button) {
        // Find the task card
        const taskCard = button.closest('.task-card') || button.closest('.task-item');
        
        // Show notification
        showNotification(Task #${taskId} submitted successfully!);
        
        // In a real application, this would submit the task to the backend
        console.log(Submitted task #${taskId});
        
        // Simulate task completion by removing the task card with animation
        taskCard.style.opacity = '0';
        taskCard.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (taskCard.parentNode) {
                taskCard.parentNode.removeChild(taskCard);
            }
        }, 500);
    }
    
    function openFeedbackModal(taskId) {
        // Set modal content based on task ID
        document.getElementById('modal-task-title').textContent = 'Research Competitors';
        document.getElementById('modal-task-description').textContent = 'Analyze competitor products and create a comparison report.';
        
        // Show modal with animation
        feedbackModal.classList.add('active');
    }
    
    function filterTasks(filter) {
        const taskCards = document.querySelectorAll('.task-card');
        
        taskCards.forEach(card => {
            const status = card.getAttribute('data-status');
            
            if (filter === 'all' || status === filter) {
                card.style.display = 'block';
                // Add animation
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function searchTasks(searchTerm) {
        const taskCards = document.querySelectorAll('.task-card');
        
        taskCards.forEach(card => {
            const title = card.querySelector('.task-title').textContent.toLowerCase();
            const description = card.querySelector('.task-description').textContent.toLowerCase();
            const project = card.querySelector('.task-project').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || project.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function renderCalendar(month, year) {
        // Update current month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthEl.textContent = ${monthNames[month]} ${year};
        
        // Get first day of month and number of days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Clear previous calendar days
        calendarDaysEl.innerHTML = '';
        
        // Add days from previous month
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day', 'other-month');
            dayEl.textContent = prevMonthDays - i;
            calendarDaysEl.appendChild(dayEl);
        }
        
        // Add days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = i;
            
            // Check if it's today
            if (year === currentDate.getFullYear() && month === currentDate.getMonth() && i === currentDate.getDate()) {
                dayEl.classList.add('today');
            }
            
            // Add event indicator for some days (for demonstration)
            if ((i % 5 === 0 || i % 7 === 0) && i <= 28) {
                dayEl.classList.add('has-event');
            }
            
            // Add click event to show events for the selected day
            dayEl.addEventListener('click', () => {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                dayEl.classList.add('selected');
                
                // Update selected date display
                selectedDateEl.textContent = ${monthNames[month]} ${i}, ${year};
                
                // Update events for selected date (in a real app, this would fetch events from a database)
                updateEventsForDate(i, month, year);
            });
            
            calendarDaysEl.appendChild(dayEl);
        }
        
        // Add days from next month to fill the calendar
        const totalDays = firstDay + daysInMonth;
        const remainingDays = 7 - (totalDays % 7);
        if (remainingDays < 7) {
            for (let i = 1; i <= remainingDays; i++) {
                const dayEl = document.createElement('div');
                dayEl.classList.add('calendar-day', 'other-month');
                dayEl.textContent = i;
                calendarDaysEl.appendChild(dayEl);
            }
        }
    }
    
    function updateEventsForDate(day, month, year) {
        // In a real application, this would fetch events from a database
        // For demonstration, we'll generate random events based on the date
        
        const eventList = document.getElementById('event-list');
        eventList.innerHTML = '';
        
        // Generate a random number of events (0-3) for the selected date
        const numEvents = Math.floor(Math.random() * 4);
        
        if (numEvents === 0) {
            const noEventsEl = document.createElement('p');
            noEventsEl.textContent = 'No events scheduled for this day.';
            noEventsEl.style.color = '#6c757d';
            noEventsEl.style.fontStyle = 'italic';
            eventList.appendChild(noEventsEl);
            return;
        }
        
        const eventTypes = [
            { title: 'Team Meeting', description: 'Weekly progress update' },
            { title: 'Project Work', description: 'Complete Project Proposal' },
            { title: 'Client Call', description: 'Discuss project requirements' },
            { title: 'Code Review', description: 'Review pull requests' },
            { title: 'Training Session', description: 'New technology workshop' },
            { title: 'Deadline', description: 'Submit project milestone' }
        ];
        
        const timeSlots = [
            '09:00 AM - 10:30 AM',
            '11:00 AM - 12:00 PM',
            '01:00 PM - 03:00 PM',
            '03:30 PM - 04:30 PM',
            '04:00 PM - 05:00 PM'
        ];
        
        // Create random events
        for (let i = 0; i < numEvents; i++) {
            const eventIndex = Math.floor(Math.random() * eventTypes.length);
            const timeIndex = Math.floor(Math.random() * timeSlots.length);
            
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `
                <div class="event-time">${timeSlots[timeIndex]}</div>
                <div class="event-details">
                    <h4>${eventTypes[eventIndex].title}</h4>
                    <p>${eventTypes[eventIndex].description}</p>
                </div>
            `;
            
            // Add animation delay for staggered appearance
            eventItem.style.animation = 'fadeIn 0.5s ease-out';
            eventItem.style.animationDelay = ${0.1 * i}s;
            
            eventList.appendChild(eventItem);
            
            // Remove the used event and time to avoid duplicates
            eventTypes.splice(eventIndex, 1);
            timeSlots.splice(timeIndex, 1);
        }
    }
    
    function initializeMiniCalendar() {
        const miniDaysContainer = document.querySelector('.mini-days');
        if (!miniDaysContainer) return;
        
        // Clear previous calendar days
        miniDaysContainer.innerHTML = '';
        
        // Get first day of month and number of days in month for April 2025
        const firstDay = new Date(2025, 3, 1).getDay(); // April is month 3 (0-indexed)
        const daysInMonth = new Date(2025, 4, 0).getDate();
        
        // Add days from previous month
        const prevMonthDays = new Date(2025, 3, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('mini-day', 'other-month');
            dayEl.textContent = prevMonthDays - i;
            miniDaysContainer.appendChild(dayEl);
        }
        
        // Add days of current month with performance indicators
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('mini-day');
            dayEl.textContent = i;
            
            // Add performance indicators for some days (for demonstration)
            if (i % 3 === 0) {
                dayEl.classList.add('performance-indicator', 'good');
            } else if (i % 5 === 0) {
                dayEl.classList.add('performance-indicator', 'partial');
            } else if (i % 7 === 0) {
                dayEl.classList.add('performance-indicator', 'poor');
            }
            
            miniDaysContainer.appendChild(dayEl);
        }
        
        // Add days from next month to fill the calendar
        const totalDays = firstDay + daysInMonth;
        const remainingDays = 7 - (totalDays % 7);
        if (remainingDays < 7) {
            for (let i = 1; i <= remainingDays; i++) {
                const dayEl = document.createElement('div');
                dayEl.classList.add('mini-day', 'other-month');
                dayEl.textContent = i;
                miniDaysContainer.appendChild(dayEl);
            }
        }
    }
    
    function initializeCharts() {
        // Dashboard performance chart
        const performanceCtx = document.getElementById('performance-chart');
        if (performanceCtx) {
            new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Performance Score',
                        data: [75, 82, 78, 85],
                        borderColor: '#4a6cf7',
                        backgroundColor: 'rgba(74, 108, 247, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
        
        // Monthly performance chart
        const monthlyPerformanceCtx = document.getElementById('monthly-performance-chart');
        if (monthlyPerformanceCtx) {
            new Chart(monthlyPerformanceCtx, {
                type: 'bar',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Efficiency',
                        data: [75, 82, 78, 85],
                        backgroundColor: '#4a6cf7'
                    }, {
                        label: 'Quality',
                        data: [85, 90, 88, 92],
                        backgroundColor: '#28a745'
                    }, {
                        label: 'Timeliness',
                        data: [70, 75, 80, 78],
                        backgroundColor: '#ffc107'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
        
        // Task completion rate chart
        const taskCompletionCtx = document.getElementById('task-completion-rate-chart');
        if (taskCompletionCtx) {
            new Chart(taskCompletionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'Pending'],
                    datasets: [{
                        data: [12, 5, 3],
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
                        duration: 2000,
                        animateRotate: true,
                        animateScale: true
                    }
                }
            });
        }
    }
    
    function addNewTask(task) {
        // In a real application, this would send data to a server
        console.log('Task added:', task);
        
        // For demo purposes, we'll create a new task card
        const tasksContainer = document.querySelector('.tasks-container');
        if (!tasksContainer) return;
        
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.setAttribute('data-status', 'in-progress');
        
        // Format the due date
        const dueDate = new Date(task.dueDate);
        const formattedDate = ${dueDate.toLocaleString('default', { month: 'short' })} ${dueDate.getDate()}, ${dueDate.getFullYear()};
        
        // Get project name from value
        let projectName = '';
        switch (task.project) {
            case 'marketing':
                projectName = 'Marketing Campaign';
                break;
            case 'redesign':
                projectName = 'App Redesign';
                break;
            case 'api':
                projectName = 'API Development';
                break;
            case 'bugs':
                projectName = 'Bug Fixes';
                break;
            default:
                projectName = 'Project';
        }
        
        taskCard.innerHTML = `
            <div class="task-header">
                <span class="task-priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                <span class="task-date">Due: ${formattedDate}</span>
            </div>
            <h3 class="task-title">${task.title}</h3>
            <p class="task-description">${task.description}</p>
            <div class="task-meta">
                <span class="task-project"><i class="fas fa-folder"></i> ${projectName}</span>
                <span class="task-time"><i class="fas fa-clock"></i> Est. ${task.estimatedTime} hours</span>
            </div>
            <div class="task-actions">
                <button class="start-task-btn" data-task-id="new">Start Task</button>
                <button class="pause-task-btn hidden" data-task-id="new">Pause Task</button>
                <button class="submit-task-btn hidden" data-task-id="new">Submit Task</button>
            </div>
        `;
        
        // Add animation
        taskCard.style.animation = 'slideInUp 0.5s ease-out';
        
        // Add to container
        tasksContainer.prepend(taskCard);
        
        // Add event listeners to new buttons
        const startBtn = taskCard.querySelector('.start-task-btn');
        const pauseBtn = taskCard.querySelector('.pause-task-btn');
        const submitBtn = taskCard.querySelector('.submit-task-btn');
        
        startBtn.addEventListener('click', (e) => {
            startTask('new', e.target);
        });
        
        pauseBtn.addEventListener('click', (e) => {
            pauseTask('new', e.target);
        });
        
        submitBtn.addEventListener('click', (e) => {
            submitTask('new', e.target);
        });
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
        
        // Add staggered animation to stat cards
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            card.style.animationDelay = ${0.1 * index}s;
        });
        
        // Add staggered animation to task cards
        document.querySelectorAll('.task-card').forEach((card, index) => {
            card.style.animationDelay = ${0.1 * index}s;
        });
    }
});