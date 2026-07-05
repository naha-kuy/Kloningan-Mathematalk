/**
 * Student Registration Form Component
 * Reusable Alpine.js component for multi-step student registration
 *
 * Usage:
 * <div x-data="studentRegistrationForm()">
 *   <!-- Your form content -->
 * </div>
 */

function studentRegistrationForm() {
    return {
        currentStep: 1,
        loading: false,
        savingDraft: false,
        loadingClasses: false,
        error: null,

        // Form steps labels
        formSteps: [
            'Data Dasar',
            'Kategori',
            'Filter Olimpiade',
            'Prestasi',
            'Hasil'
        ],

        // Form data structure
        formData: {
            // Basic info
            nama_siswa: '',
            jenjang_kelas: 'SD',
            sekolah: '',
            province_id: '',
            city: '',
            date_of_birth: '',
            phone: '',

            // Category
            category: '',

            // Olympiad filters
            is_first_competition: null,
            has_won_medal: null,

            // Achievements
            achievements: [],

            // Additional
            notes: ''
        },

        // Data storage
        allProvinces: [],
        classificationResult: null,
        recommendedClasses: [],

        /**
         * Initialize component
         */
        async init() {
            await this.loadProvinces();
            await this.loadDraft();
            this.setupAutoSave();
        },

        /**
         * Load provinces from API
         */
        async loadProvinces() {
            try {
                const res = await fetch('/api/v1/public/provinces');
                const data = await res.json();
                this.allProvinces = data.data || [];
            } catch (error) {
                console.error('Failed to load provinces:', error);
                this.showError('Gagal memuat data provinsi');
            }
        },

        /**
         * Load saved draft from localStorage or API
         */
        async loadDraft() {
            // Check for saved draft in localStorage
            const savedDraft = localStorage.getItem('registration_draft');
            if (savedDraft) {
                try {
                    const draft = JSON.parse(savedDraft);
                    // Check if draft is not too old (24 hours)
                    const draftAge = Date.now() - draft.timestamp;
                    if (draftAge < 24 * 60 * 60 * 1000) {
                        this.formData = { ...this.formData, ...draft.data };
                        this.currentStep = draft.step || 1;
                    } else {
                        localStorage.removeItem('registration_draft');
                    }
                } catch (error) {
                    console.error('Failed to load draft:', error);
                }
            }
        },

        /**
         * Setup auto-save every 30 seconds
         */
        setupAutoSave() {
            setInterval(() => {
                if (this.formData.nama_siswa && this.currentStep < 5) {
                    this.saveDraft();
                }
            }, 30000);
        },

        /**
         * Save draft to server and localStorage
         */
        async saveDraft() {
            this.savingDraft = true;

            try {
                // Save to server
                await fetch('/api/v1/public/registration/draft', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({
                        current_step: this.currentStep,
                        ...this.formData
                    })
                });

                // Save to localStorage
                localStorage.setItem('registration_draft', JSON.stringify({
                    data: this.formData,
                    step: this.currentStep,
                    timestamp: Date.now()
                }));

            } catch (error) {
                console.error('Draft save error:', error);
            }

            this.savingDraft = false;
        },

        /**
         * Navigate to next step
         */
        async nextStep() {
            if (!this.validateCurrentStep()) return;

            this.loading = true;
            await this.saveDraft();

            // If going from step 3 to 4, check if we need achievements
            if (this.currentStep === 3) {
                if (this.formData.category === 'non_olympiad' || this.formData.has_won_medal === false) {
                    // Skip achievements step
                    this.currentStep = 5;
                    await this.completeRegistration();
                } else {
                    this.currentStep = 4;
                }
            } else {
                this.currentStep++;
            }

            this.loading = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        /**
         * Navigate to previous step
         */
        prevStep() {
            if (this.currentStep === 4) {
                // From achievements, go back to filters
                this.currentStep = 3;
            } else if (this.currentStep > 1) {
                this.currentStep--;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        /**
         * Validate current step
         */
        validateCurrentStep() {
            const validators = {
                1: () => this.formData.nama_siswa &&
                       this.formData.sekolah &&
                       this.formData.province_id &&
                       this.formData.city &&
                       this.formData.jenjang_kelas,

                2: () => this.formData.category !== '',

                3: () => {
                    if (this.formData.category === 'non_olympiad') return true;
                    return this.formData.is_first_competition !== null;
                },

                4: () => {
                    if (this.formData.has_won_medal === false) return true;
                    if (this.formData.has_won_medal === true) {
                        return this.formData.achievements.length > 0;
                    }
                    return true;
                }
            };

            const validator = validators[this.currentStep];
            return validator ? validator() : true;
        },

        /**
         * Complete registration
         */
        async completeRegistration() {
            this.loading = true;
            this.error = null;

            try {
                const res = await fetch('/api/v1/public/registration/complete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify(this.formData)
                });

                const data = await res.json();

                if (data.success) {
                    this.classificationResult = data.data;
                    await this.loadRecommendedClasses();
                    this.currentStep = 5;

                    // Clear draft
                    localStorage.removeItem('registration_draft');

                    // Show success toast
                    this.showToast('Registrasi berhasil! Siswa telah diklasifikasikan.', 'success');
                } else {
                    throw new Error(data.message || 'Registrasi gagal');
                }

            } catch (error) {
                console.error('Registration error:', error);
                this.error = error.message || 'Terjadi kesalahan. Silakan coba lagi.';
                this.showToast(this.error, 'error');
            }

            this.loading = false;
        },

        /**
         * Load recommended classes based on classification
         */
        async loadRecommendedClasses() {
            if (!this.classificationResult?.recommended_classes) {
                this.loadingClasses = true;
                // Could fetch from API if needed
                this.loadingClasses = false;
            } else {
                this.recommendedClasses = this.classificationResult.recommended_classes;
            }
        },

        /**
         * Add new achievement
         */
        addAchievement() {
            this.formData.achievements.push({
                competition_name: '',
                achievement_level: 'local',
                medal_type: 'gold',
                achievement_year: new Date().getFullYear()
            });
        },

        /**
         * Remove achievement by index
         */
        removeAchievement(index) {
            this.formData.achievements.splice(index, 1);
        },

        /**
         * Get early recommendation (for step 3)
         */
        getEarlyRecommendation() {
            if (this.formData.category === 'non_olympiad') {
                return 'Grup Besar';
            }

            if (this.formData.is_first_competition) {
                return 'Semi-Private';
            }

            if (this.formData.has_won_medal === false) {
                return 'Semi-Private';
            }

            if (this.formData.has_won_medal === true) {
                return 'Kelas Medalist / Private';
            }

            return 'Belum dapat ditentukan';
        },

        /**
         * Get early recommendation reason
         */
        getEarlyRecommendationReason() {
            if (this.formData.category === 'non_olympiad') {
                return 'Untuk fokus akademik sekolah dengan biaya terjangkau';
            }

            if (this.formData.is_first_competition) {
                return 'Perlu fondasi yang kuat untuk kompetisi';
            }

            if (this.formData.has_won_medal === false) {
                return 'Perlu pengembangan skill lebih lanjut';
            }

            if (this.formData.has_won_medal === true) {
                return 'Akan ditentukan setelah melihat prestasi';
            }

            return '';
        },

        /**
         * Get classification badge emoji
         */
        getClassificationBadge() {
            if (!this.classificationResult) return '🎯';

            const status = this.classificationResult.classification_status?.toLowerCase();
            if (status?.includes('medalist')) return '🏆';
            if (status?.includes('potential')) return '⭐';
            if (status?.includes('beginner')) return '🌟';
            return '🎯';
        },

        /**
         * Get medal emoji
         */
        getMedalEmoji(medalType) {
            const medals = {
                gold: '🥇',
                silver: '🥈',
                bronze: '🥉',
                hm: '🎖️'
            };
            return medals[medalType] || '🏅';
        },

        /**
         * Get level label
         */
        getLevelLabel(level) {
            const labels = {
                local: 'Kota/Kabupaten',
                national: 'Nasional',
                international: 'Internasional'
            };
            return labels[level] || level;
        },

        /**
         * Format currency to IDR
         */
        formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        },

        /**
         * Show toast notification
         */
        showToast(message, type = 'info') {
            // Dispatch custom event that can be caught by toast component
            window.dispatchEvent(new CustomEvent('toast', {
                detail: { message, type }
            }));
        },

        /**
         * Show error message
         */
        showError(message) {
            this.error = message;
            this.showToast(message, 'error');
        }
    };
}
