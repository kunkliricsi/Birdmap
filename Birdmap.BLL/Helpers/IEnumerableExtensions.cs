using System;
using System.Collections.Generic;
using System.Linq;

namespace Birdmap.BLL.Helpers
{
    public static class IEnumerableExtensions
    {
        public static TSource RandomElementAt<TSource>(this IEnumerable<TSource> source, Random random = null)
        {
            random ??= new Random();

            return source.ElementAt(random.Next(source.Count()));
        }
    }
}
