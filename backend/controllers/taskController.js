exports.getAllTasks = async (req, res) => {
    try {
        // Add a test task (Run once)
        await Task.create({ title: "Test Task", description: "This is a test task", status: "pending" });

        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
};
