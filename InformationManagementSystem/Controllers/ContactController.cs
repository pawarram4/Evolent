using InformationManagementSystem.Models.DbProvider;
using System.Linq;
using System.Web.Mvc;

namespace InformationManagementSystem.Controllers
{
    public class ContactController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllContactDetails()
        {
            using (var imsEntities = new InformationManagementSystemEntities())
            {
                var contactDetailsList = imsEntities.Contacts.ToList();
                return Json(contactDetailsList, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetContactDetailsById(int contactId)
        {
            using (var imsEntities = new InformationManagementSystemEntities())
            {
                var contactDetailsList = imsEntities.Contacts.Find(contactId);
                return Json(contactDetailsList, JsonRequestBehavior.AllowGet);
            }
        }

        public bool AddContactDetails(Contact contact)
        {
            if (contact == null) return false;
            using (var imsEntities = new InformationManagementSystemEntities())
            {
                imsEntities.Contacts.Add(contact);
                imsEntities.SaveChanges();
                return true;
            }
        }

        public bool UpdateContactDetails(Contact contact)
        {
            if (contact == null) return false;
            using (var imsEntities = new InformationManagementSystemEntities())
            {
                var contactDetailsFormDb = imsEntities.Contacts.FirstOrDefault(x => x.ContactId == contact.ContactId);
                if (contactDetailsFormDb != null)
                {
                    contactDetailsFormDb.FirstName = contact.FirstName;
                    contactDetailsFormDb.LastName = contact.LastName;
                    contactDetailsFormDb.EmailId = contact.EmailId;
                    contactDetailsFormDb.PhoneNumber = contact.PhoneNumber;
                    contactDetailsFormDb.Status = contact.Status;
                }
                imsEntities.SaveChanges();          
                return true;
            }
        }

        public bool DeleteContactDetails(Contact contact)
        {
            if (contact == null) return false;
            using (var imsEntities = new InformationManagementSystemEntities())
            {
                var contactDetails = imsEntities.Contacts.FirstOrDefault(x => x.ContactId == contact.ContactId);
                if (contactDetails != null) imsEntities.Contacts.Remove(contactDetails);
                imsEntities.SaveChanges();
                return true;
            }          
        }
    }
}