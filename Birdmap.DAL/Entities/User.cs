namespace Birdmap.DAL.Entities
{
    public enum Roles
    {
        User,
        Admin,
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public Roles Role { get; set; }
    }
}
