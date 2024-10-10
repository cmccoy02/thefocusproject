<?php
// submit_survey.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $study_hours = isset($_POST['study_hours']) ? $_POST['study_hours'] : '';
    $distraction_level = isset($_POST['distraction_level']) ? $_POST['distraction_level'] : '';
    // Add more variables for additional questions

    // Validate data (simple validation)
    if ($study_hours === '' || $distraction_level === '') {
        // Redirect back to survey with error (you can handle this better in production)
        header('Location: survey.html');
        exit;
    }

    // Prepare data for storage
    $data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'study_hours' => $study_hours,
        'distraction_level' => $distraction_level,
        // Add more fields as needed
    ];

    // Convert data to JSON
    $jsonData = json_encode($data);

    // Save data to a file
    $file = 'survey_data.json';
    file_put_contents($file, $jsonData . PHP_EOL, FILE_APPEND | LOCK_EX);

    // Redirect to thank you page
    header('Location: thank_you.html');
    exit;
}
?>