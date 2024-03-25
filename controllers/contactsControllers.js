import { listContacts, getContactById, removeContact, addContact } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    try {
        const result = await listContacts();
        res.json(result);
    } catch (error) {
        console.error("Error getting contacts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOneContact = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await getContactById(id);
       
        if (!result){
            res.status(404).json({ 
                message: `A contact with such id=${id} was not found`
            });
        }
        res.json(result);
    } catch (error) {
        console.error("Error getting contacts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
