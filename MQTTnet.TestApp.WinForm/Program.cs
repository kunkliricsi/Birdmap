// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Program.cs" company="Haemmer Electronics">
//   Copyright (c) 2020 All rights reserved.
// </copyright>
// <summary>
//   The main program.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace MQTTnet.TestApp.WinForm
{
    using System;
    using System.Threading;
    using System.Windows.Forms;

    /// <summary>
    /// The main program.
    /// </summary>
    internal static class Program
    {
        static readonly Mutex mutex = new Mutex(true, "{B9D725A5-48F1-4907-974F-B6C3B9C8C4BB}");

        /// <summary>
        ///     The main entry point for the application.
        /// </summary>
        [STAThread]
        private static void Main()
        {
            if (!mutex.WaitOne(TimeSpan.Zero, true))
                return;

            try
            {
                Application.SetHighDpiMode(HighDpiMode.SystemAware);
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new Form1());
            }
            finally
            {
                mutex.ReleaseMutex();
            }
        }
    }
}
