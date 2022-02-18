var express = require('express');
var router = express.Router();

// Controller modules.
var category_controller = require('../controllers/categoryController')
var component_controller = require('../controllers/componentController')
var manufacturer_controller = require('../controllers/manufacturerController')

// CATEGORY Routes

// GET request for creating a category. NOTE This must come before routes that display category (uses id).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all category items.
router.get('/category', category_controller.category_list);

// COMPONENT ROUTES 

// GET request for creating Component. NOTE This must come before route for id (i.e. display component).
router.get('/component/create', component_controller.component_create_get);

// POST request for creating Component.
router.post('/component/create', component_controller.component_create_post);

// GET request to delete Component.
router.get('/component/:id/delete', component_controller.component_delete_get);

// POST request to delete Component.
router.post('/component/:id/delete', component_controller.component_delete_post);

// GET request to update Component.
router.get('/component/:id/update', component_controller.component_update_get);

// POST request to update Component.
router.post('/component/:id/update', component_controller.component_update_post);

// GET request for one Component.
router.get('/component/:id', component_controller.component_detail);

// GET request for list of all components.
router.get('/components', component_controller.component_list);

// MANUFACTURER ROUTES 

// GET request for creating Manufacturer. NOTE This must come before route for id (i.e. display component).
router.get('/manufacturer/create', manufacturer_controller.manufacturer_create_get);

// POST request for creating Manufacturer.
router.post('/manufacturer/create', manufacturer_controller.manufacturer_create_post);

// GET request to delete Manufacturer.
router.get('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_get);

// POST request to delete Manufacturer.
router.post('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_post);

// GET request to update Manufacturer.
router.get('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_get);

// POST request to update Manufacturer.
router.post('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_post);

// GET request for one Manufacturer.
router.get('/manufacturer/:id', manufacturer_controller.manufacturer_detail);

// GET request for list of all manufacturers.
router.get('/manufacturers', manufacturer_controller.manufacturer_list);

module.exports = router