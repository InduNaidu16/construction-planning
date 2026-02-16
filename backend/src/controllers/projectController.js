const Project = require('../models/Project');
const FileParser = require('../utils/fileParser');
const BudgetCalculator = require('../utils/budgetCalculator');
const ThreeD_ModelGenerator = require('../utils/modelGenerator');

class ProjectController {
  static async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const parsedData = await FileParser.parseFile(req.file.path);

      const project = new Project({
        projectName: req.body.projectName || 'Untitled Project',
        description: req.body.description,
        uploadedFile: {
          filename: req.file.filename,
          path: req.file.path,
          uploadDate: new Date()
        },
        buildingData: req.body.buildingData || {},
        status: 'draft'
      });

      await project.save();

      res.json({
        message: 'File uploaded successfully',
        projectId: project._id,
        parsedData: parsedData
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProject(req, res) {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async generate3DModel(req, res) {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const generator = new ThreeD_ModelGenerator(project.buildingData);
      const model3D = generator.generateBasic3DModel();

      project.model3D = {
        url: `/models/${project._id}.json`,
        format: 'JSON',
        generatedDate: new Date()
      };
      project.status = 'completed';

      await project.save();

      res.json({
        message: '3D model generated successfully',
        model: model3D,
        projectId: project._id
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async calculateBudget(req, res) {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const calculator = new BudgetCalculator(project.buildingData);
      const budget = calculator.calculateTotalBudget();

      project.budget = budget;
      await project.save();

      res.json({
        message: 'Budget calculated successfully',
        budget: budget,
        projectId: project._id
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listProjects(req, res) {
    try {
      const projects = await Project.find().select('projectName description status createdAt');
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProject(req, res) {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBuildingData(req, res) {
    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { buildingData: req.body },
        { new: true }
      );
      res.json({
        message: 'Building data updated',
        project: project
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProjectController;