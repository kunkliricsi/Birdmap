using System;
using System.Runtime.Serialization;

namespace Birdmap.BLL.Exceptions
{
    [Serializable]
    public class AuthenticationException : Exception
    {
        public AuthenticationException()
            : base("Username or password is incorrect.")
        {
        }

        public AuthenticationException(string message) : this()
        {
        }

        public AuthenticationException(string message, Exception innerException) : this()
        {
        }

        protected AuthenticationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
