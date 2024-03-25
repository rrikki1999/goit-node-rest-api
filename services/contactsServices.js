import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    throw error;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!removedContact) {
      console.log("Such contact with such ID was not found");
      return null;
    }
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } catch (error) {
    throw error;
  }
}

export async function addContact(name, email, phone) {
  try {
    const newContact = { id: Date.now(), name, email, phone };
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

export const updateContactById = async (id, data) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    throw error;
  }
}
