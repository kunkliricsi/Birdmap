using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Birdmap.Exceptions
{
    public class AuthenticationException : Exception
    {
        public AuthenticationException()
            : base("Username or password is incorrect.")
        {
        }
    }
}
