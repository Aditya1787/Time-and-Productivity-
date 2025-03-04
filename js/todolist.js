/*To-do List App*/
("use strict");

/**
 * Function that handle the elements that will be affected if there's an error.
 * @param {*} inputAdd Input that has the error.
 * @param {*} error Boolean to detect if theres an error or no.
 */
const handleErrorsInputAdd = (inputAdd, error) => {
	if (!$(inputAdd).hasClass("errorAdd") && error) {
		// Show error message and add classes to move some elements
		$(inputAdd).prev().addClass("errorAdd");
		$(inputAdd).addClass("errorAdd");
		$(inputAdd).next().addClass("errorAdd");
		$(inputAdd).next().next().text("Please enter some text to add the task.");
		$(inputAdd).next().next().removeClass("hide");
	} else if ($(inputAdd).hasClass("errorAdd") && !error) {
		// Remove error message and remove classes to move some elements
		$(inputAdd).prev().removeClass("errorAdd");
		$(inputAdd).removeClass("errorAdd");
		$(inputAdd).next().removeClass("errorAdd");
		$(inputAdd).next().next().text("");
		$(inputAdd).next().next().addClass("hide");
	}
};

/**
 * Function that calculate the current day and add it to a label.
 */
const currentDay = () => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let currentDate = new Date();
	var currentDayOfWeek = currentDate.getDay();
	var currentDayName = daysOfWeek[currentDayOfWeek];

	$("#currentDaySalute").text(currentDayName);
};

/**
 * Function that get the user's entry. validate it and then show an error or add it.
 */
$(document).ready(() => {
    // Function to add a task
    const addTask = () => {
        const inputAdd = $("#add input");
        const task = inputAdd.val().trim();

        if (task.length === 0) {
            handleErrorsInputAdd(inputAdd, true);
        } else {
            handleErrorsInputAdd(inputAdd, false);
            // Create new task elements
            const newDivTask = $("<div></div>").addClass("task");
            newDivTask.append('<input type="checkbox" name="checkbox">');
            const newInputTask = $('<input type="text" disabled>').val(task);
            newDivTask.append(newInputTask);
            newDivTask.append('<i class="fas fa-times remove-task"></i>');

            $("#todolistapp").append(newDivTask);

            // Clear input field
            inputAdd.val("");
        }
    };

    // Event listener for adding a task when clicking the button
    $("#add button").on("click", addTask);

    // Event listener for pressing "Enter" inside the input field
    $("#add input").on("keypress", (e) => {
        if (e.which === 13) { // 13 is the keycode for "Enter"
            addTask();
        }
    });

    // Event listener to remove a task when clicking the delete icon
    $(document).on("click", ".remove-task", function () {
        $(this).parent().remove();
    });
});


/**
 * Function that remove one task the its icon X is clicked.
 * @param {*} evt Element clicked.
 */
const removeTask = (evt) => {
	const iconInputClicked = evt.currentTarget;
	$(iconInputClicked)
		.parent()
		.animate({ opacity: 0, marginLeft: "+700px" }, 500, () => {
			$(iconInputClicked).parent().remove();
		});
};

/**
 * Function that toggle a class when a task checkbox is clicked
 * @param {*} evt Element clicked.
 */
const taskCheckBok = (evt) => {
	const iconInputClicked = evt.currentTarget;
	$(iconInputClicked).next().toggleClass("taskChecked");
};

$(() => {
	currentDay();
	$("#add i").click(addTask);
	$("#todolistapp").on("click", ".task i", removeTask);
	$("#todolistapp").on("click", '.task input[type="checkbox"]', taskCheckBok);
});
