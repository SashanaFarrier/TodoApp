﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace TodoApp.Areas.Identity.Data;

// Add profile data for application users by adding properties to the TodoAppUser class
public class User : IdentityUser
{
    //[PersonalData]
    //public string? FirstName { get; set; }

    //[PersonalData]
    //public string? LastName { get; set;}
    //[PersonalData]
    public string? Name { get; set; }
}

