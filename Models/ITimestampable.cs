using System;

namespace qsales.Models
{
    public interface ITimestampable
    {
        DateTime EntryDate { get; set; }
    }
}